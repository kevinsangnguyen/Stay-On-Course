myApp.factory('postFactory', function($http, $state, auth){
  factory = {};
  posts = [];

  factory.addPost = function(newPost, callback){
    newPost._user = auth.currentUserID();
    $http.post('/posts/new', newPost).success(function(res){
      if(res.status == 'error'){
        console.log("error with adding post");
      }else{
        posts.push(res);
        callback(res);
      }
    })
  };

  factory.allPosts = function(callback){
    $http.get('/posts/' + auth.currentUserID()).success(function(res){
      if(res.status == 'error'){
        console.log('error in loading names');
      }else{
        posts = res;
        callback(posts);
      };
    });
  };

  factory.getLast = function(callback){
    $http.get('/lastpost/' + auth.currentUserID()).success(function(res){
      if(res.status == 'error'){
        console.log('error in loading names');
      }else{
        callback(res);
      };
    })
  };

  factory.editPost = function(post, callback){
    $http.post('/posts/edit/', post).success(function(res){
      if(res.status == 'error'){
        console.log('error in editing name');
      }else{
        callback(res)
      };
    });
  };

  factory.delete = function(post, callback){
    $http.get('/posts/delete/'+post._id).success(function(res){
      if(res.status == 'error'){
        console.log("error with deleting name");
      }else{
        callback(res);
      }
    })
  };

  return factory;
})
