Meteor.startup(function(){
  if(process.env.METEOR_ENV =="production") {
    console.log("Running in production");
    process.env.ROOT_URL="http://your-url" //production url
  }

});