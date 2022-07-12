# Sweep?

Sweep? Arial? Aspect? I guess I can decide on a permanent name if anyone expresses any interest in using the project, which is probably a long way off. Whatever this project is called, it's used to apply image processing to web maps in real time using WebGl

# Background

Web maps are awesome because they allow you to view huge areas at a range of zoom levels without worrying about storing terrabytes of imagery on your machine. They aren't awesome because each tile is fetched from the internet as and when you require it, meaning that the experience is generally read-only. Sweep (or Arial, or Aspect) aims to leverage WebGL to apply image processing to tiles as they're fetched, theoretically giving the user the ability to perform complex remote-sensing operations on an unlimited scale

# Development

The following section is mostly for my benefit, so that I can log the design "decisions" that I make. I keep finding myself coming back to the project after taking a break and having to recall why stuff is done the way it is. This makes the architecture of the project sound more organized than it is - a lot of it is done a certain way cos that's just how I did it - but there are some overarching principles that are worth noting. It could be argued that some of these principles are anti-patterns, but that's fine - I find it easiest to build software in a way that is logical to me

## "Un-separation" of concerns - AKA - one canonical location for all related logic:

React separates concerns really well - too well for my liking. I prefer to keep related logic in one place, rather than having to manage logic across multiple components (for example, a button and a UI). As great as React is, passing state between components is annoying and can result in coupling. I prefer to keep all logic at the highest level possible (in the above example, the button) and defining all lower-level components within that file (e.g the UI). The lower-level components can then be shipped off to their final destination via centralized state management (in this case Zustand hooks). There is a little bit of extra boilerplate associated with this approach, but the tradeoff is worth it in order to have all logic + event handling in the same place - very useful as a solo developer sporadically working on an ambitious project

## Config is king - AKA - don't instantiate objects until you really really need to:

I've come back to the project a few times and been confused by ugly branching in low level components. I keep needing to remind myself that this was a conscious and (in my opinion) sensible decision to preserve config for as long as possible. Data in Sweep (there are three main data types - relating to OpenLayers, the UI and WebGL) is serializable until the layer needs to be rendered. Once rendering starts, the data is immutable. This results in branching in low level components, as classes need to be instantiated based on primitive values, but the upside is that data can be represented as JSON for most of its lifecycle, allowing entire map states to be represented by JSON

## DIY - AKA - lower level is better level (__in this context__):

If you look around in the git history of the project (not sure why you would... in fact, please don't), you'll see that this project originally used MUI. MUI met the same fate in this projects as component libraries do in all of my projects - it got panned early. All applications shipped to users (that is, "unfriendly" users) above a nominal level of complexity require more nuance in appearance and functionality than a component library can provide. They are (__in this context__) a false economy. Better just to bite the bullet and build a component library using utility classes, as and when you need components - and hopefully I'll be able to split this component library out into it's own package at some point for use in future projects

