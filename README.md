# Vue.JS / Laravel College System Application
The purpose of this application was to demonstrate the ability to design and develop and Vue.JS frontend application which can consume and handle a Laravel REST API.

The application is written in Vue.JS, and utilizes VueMaterial as a component library, and also utilizes vue-chartjs & chart.js.

## Installation Instructions

Follow these steps to install the application:

- Create a db in PhpMyAdmin
- Duplicate '.env.example' and name it '.env'
- Open .env and set the DB_DATABASE to the db you created
- Run `composer install && npm i` to install necessary dependencies
- Run `php artisan migrate --seed && php artisan key:generate && php artisan passport:install` 
- Run `php artisan serve` to start the development server
- Open another terminal window and run `npm run watch` to compile the frontend

## Live Demo
A live demo of this application can be found here - https://ca2-college-system.herokuapp.com/