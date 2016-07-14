# WeatherApp

Installed Node Package Manager and bower.json
Used express service to configure the server (Server.js) file
Used openweathermap api to call 7 days forecast by city name in XML format and metric units.
Wrote routes, services and controllers to render the application on user interface (app.js) file
Routes for navigating to different pages of the application
Services to set default city before the user specifies his preferred choice of city
Wrote Controllers such as home controller which  navigates the user to the forecast page when the user submits his preferred choice of city for forecast
Forecast controller which fetches city name and days count in XML format recieved from openweathermap api and performs mathematical calculations in functions written to convert the temperature in degree or farenheit.
Using the directive ng-show in forecast.htm page data is written under angularjs expression to render it on the User interface (Forecast.htm)

