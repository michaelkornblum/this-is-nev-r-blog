# Welcome to Nev-R-Blog

The **Nev-R-Blog Project** aims to create an integrated solution for the creation and deployment of static HTML pages with a friendly, CMS-like web interface.

## Why Do We Need It?

The JAMstack is an excellent idea. By creating websites that solely use client-side JavaScript, web APIs, and good old fashioned Markup, it is possible to create secure and performant products that can be hosted anywhere.

However, many of the current JAMstack solutions require the pairing of different (and often disparate) tools, technologies and third-party services. Additionally, many of them fail to provide a user-friendly way to create and edit content. This is where the JAMstack pales in comparison to other established content management solutions like WordPress.

**Nev-R-Blog** aims to make the life of JAMstack developer easier. By offering an integrated, solution that is easy to deploy, and even easier to use, developers can get their clients up and running with a content-rich website in minutes.

## What's Under the Hood?

Nev-R-Blog does not seek to reinvent the wheel. When completed, it may leverage the following technologies:

-   NodeJS
-   Express
-   ejs
-   MongoDB or NEDB
-   React or Vue
-   Gatsby or Gridsome

## How Far Along is the Project?

Not very far. Currently, I'm using Bootstrap to create a basic UI, a flat file system to emulate database functionality, and Express to handle app behaviors. Once I've established some basic data models and how the app works with them, I'll be moving on to working with a real database, and start to bolt other features onto the app from there.

Currently, Nev-R-Blog uses three data models; **Collections**, **Fields** and **Entries**.

### Collections

A collection is the top level of how data is stored in Nev-R-Blog. Each collection serves as a category in which the other data models are stored. Examples of a collection could be blog posts, shop items, or contributors.

### Fields

A field is used to create those pieces of data that will ultimately be used to create _entries_ in a _collection_. For example an item in an author collection may have a field for the authors name, a field for the authors biography, and a field for the authors portrait.

### Entries

An entry is an item in a collection. The data structure of each entry is dictated by its associated fields and is represented as an HTML form.

## When Will a Working Version be Ready?

**Nev-R-Blog** is my personal project, coding journey and learning experience. There will be times when you may see a few commits a day, and features being added at a fever pitch. There will be other times when a month or two goes by before this repo is updated.

If it has been a minute since my last commit, I may have gone off to learn something new that benefits the project. Or maybe life is getting in the way of my coding activites. Take comfort in the fact that this project will be released when it is finished, **_and it will be finished._**
