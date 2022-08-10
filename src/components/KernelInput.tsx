import update from "immutability-helper";
import React, { createRef, useEffect, useMemo, useState } from "react";
import { exceedsMaxLength, isNumber } from "@/utils/utils";

export const KernelInput = ({
  rows,
  cols,
  values: defaultValues,
  className,
  onChange,
  onError,
}: {
  rows: number;
  cols: number;
  values: string[][];
  className?: string;
  onChange?: (kernel: string[][]) => void;
  onError?: (message: string | undefined) => void;
}) => {
  const childRefs = useMemo(() => {
    return defaultValues.flat().map(() => createRef<HTMLTableCellElement>());
  }, [defaultValues]);

  const [kernelValues, setKernelValues] = useState(defaultValues);

  if (!(rows === defaultValues.length)) {
    onError && onError("Wrong number of table rows");
  }

  if (!(cols === defaultValues[0].length)) {
    onError && onError("Wrong number of table cols");
  }

  const nRows = [...Array(rows).keys()];
  const nCols = [...Array(cols).keys()];

  const nestedIndexToFlat = (rowIndex: number, colIndex: number) => {
    return rows * rowIndex + colIndex;
  };

  const handleError = (message: string) => {
    onError && onError(message);
  };

  const updateValue = (value: string, rowIndex: number, colIndex: number) => {
    if (value === "" || value.slice(-1) === ".") {
      return;
    }
    const targetRef = childRefs[nestedIndexToFlat(rowIndex, colIndex)];
    if (targetRef.current) targetRef.current.textContent = value;
    const newValue = update(kernelValues, {
      [rowIndex]: {
        [colIndex]: { $set: value },
      },
    });
    setKernelValues(newValue);
    onChange && onChange(newValue);
  };

  useEffect(() => {
    kernelValues.flat().forEach((value, index) => {
      const targetRef = childRefs[index];
      if (targetRef.current) targetRef.current.textContent = `${value}`;
    });
  });

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <table className="w-35 p-0 text-center">
        <tbody>
          {nRows.map((row, rI) => {
            return (
              <tr key={`${row}`}>
                {nCols.map((col, cI) => {
                  return (
                    <td
                      ref={childRefs[nestedIndexToFlat(rI, cI)]}
                      className="bg-white-500/60 rounded"
                      key={`${row}-${col}`}
                      onInput={(e) => {
                        const value = e.currentTarget.textContent as string;
                        if (!isNumber(value)) {
                          handleError("Input must be a number");
                        }

                        updateValue(value, rI, cI);
                      }}
                      onKeyDown={(e) => {
                        const value = e.currentTarget.textContent as string;
                        const selection =
                          window.getSelection()?.toString().length ?? 0;

                        if (
                          exceedsMaxLength(value + ".", 5) &&
                          e.key != "Delete" &&
                          e.key != "Backspace" &&
                          e.key != "ArrowLeft" &&
                          e.key != "ArrowRight" &&
                          selection === 0
                        ) {
                          e.preventDefault();
                        }

                        if (e.key == "Enter") {
                          childRefs[nestedIndexToFlat(rI, cI)].current?.blur();
                          childRefs[nestedIndexToFlat(rI, cI)].current
                            ?.onselectionchange;
                        }
                      }}
                      contentEditable
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
