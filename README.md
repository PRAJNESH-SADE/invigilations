## AUTOPROCTOR

(A well integrated platform for automating the invigilation and recoring absentee statements)

A simple demo chat app built on [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) and [Firebase.io](https://firebase.io/).

## Demo

# //Link here


# What is this project?
The proposed Invigilation Duty and Absentee Statement Management System addresses the challenges associated with invigilation duty allocation, adjustment, and absentee statement collection in educational institutions. This comprehensive solution enhances the efficiency of the examination process, promotes transparency, and simplifies the management of absentees, both room-wise and course-wise.



•	Create tables for users, departments, courses, faculty, rooms, invigilation schedules, and absentee statements.
•	Track invigilation counts and last invigilation dates for faculty members.
•	Store absentee information, including room and course details.

•	Assign invigilation duties to faculty members based on room availability.
•	Ensure that faculty members do not exceed their maximum allowed invigilation’s for the academic year.
•	Reset invigilation counts and last invigilation dates at the beginning of each academic year.

•	Integrate email notifications to inform faculty members of their assigned invigilation duties.
•	Send notifications for invigilation duty swap/adjustment requests.
•	Include options to accept or reject requests directly from the email.
Request and Acceptance Process:
•	Allow faculty members to initiate and manage swap/adjustment requests.
•	Update the invigilation schedule and send confirmation emails when requests are accepted.
Absentee Statement Collection:
•	Allow Admin and Department Incharge to collect absentee statements room-wise.
•	Provide functionality for Admin to generate consolidated absentee statements course-wise.
User Interface:
•	Design user-friendly interfaces for Admin, Department Incharge, and Faculty.
•	Provide dashboards for managing invigilation schedules, faculty information, adjustment requests, and absentee statements.
Conclusion:

# Features
   • Used POST method and hashing
   • User Authentication and Authorization
   • Database Design
   • Automatic Random Allotment Algorithm
   • Email Notifications
   • User Interface
   • Sign Up
   • Sign In
   • Session management system
   • Homepage
   • Edit account
   • Delete account
   • Remember me
   • Two-step verification
    

## Pre-requisites

To setup and run the project for local development / testing, you will need to use Node.js and NPM. I don't explicitly specify a minimum Node.js/NPM version for the app but I recommend going with whatever the latest LTS version is at the point in time you are setting things up. The minimum vesion of Node.js that I have tested this app on is **10.16.3**.

Installers can be found here: [https://nodejs.org/en/download](https://nodejs.org/en/download/)

Another option for installing Node is the **Node Version Manager** (**nvm**), which is a POSIX-compliant bash script to manage multiple active Node.js versions. Instructions for installing and using nvm to install Node and NPM can be found at [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

## Installation

The code for the chat app can be found at the public [GitHub](https://github.com/) repo [https://github.com/PRAJNESH-SADE/invigilations]
(https://github.com/PRAJNESH-SADE/invigilations). Either clone the repo to a local folder on your machine or download and extract the archive if you don't have [Git](https://git-scm.com/) installed.

Open a terminal window session, or the equivalent on your machine, and enter the following command to install all the Node modules needed to run the app:

```sh
npm install
```

## Run the app in development mode

After doing an `npm install` enter the following `npm run` command:

```sh
npm run dev
```

This will start the app and set it up to listen for incoming connections on port 3000. Open up your browser of choice and go to the url [http://localhost:3000/](http://localhost:3000/) to start using the app itself. The `npm run dev` command automatically runs the app using the `nodemon` script so any changes you make to the app's javascript, CSS or HTML code will automatically restart it.

## Customizing the listening port

To configure the port that the app listens on at startup, copy the file `.env.example`, located at the root of the project, to `.env` and set an appropriate value for the `PORT` environment variable listed in the file. This must be done before the app is started.
