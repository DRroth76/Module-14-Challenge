The code that I worked on is on the app.js javascript file in the js folder, which in turn is in the static folder.

Here I used a json file provided for us as my url.
I then set a function which uses this url and created constant variables that I would use in my visualizations.
I created a bar chart which takes the top 10 otuIDs for each test subject ID and ranks them by sample values.
I then created a bubble chart which shows the various otuIDs and their sample values. The circles' sizes correspond to the number of sample values, just as the bar charts did.
I started out initially using the first subject ID's values as something of a placeholder, then worked on a dropdown menu that would pick a subject ID, which would update the charts.
I finally inserted in the metadata for each subject ID in the demographic info element, which also updates whenever a subject ID is chosen.
At the end I initialized the two functions necessary for this dashboard by putting them in the init function.
