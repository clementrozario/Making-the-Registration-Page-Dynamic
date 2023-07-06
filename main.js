function createPost(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(post);
      }, 1000);
    });
  }
  
  function updateLastUserActivityTime() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function deletePost(postId) {
    return new Promise((resolve) => {
      // Simulating post deletion
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function getUserPosts() {
    return new Promise((resolve) => {
      // Simulating fetching user's posts
      setTimeout(() => {
        resolve([
          { id: 1, content: "Post 1" },
          { id: 2, content: "Post 2" },
          { id: 3, content: "Post 3" },
        ]);
      }, 1000);
    });
  }  
  
  function demo() {
    const post = { id: 4, content: "New Post" };
  
    Promise.all([createPost(post), updateLastUserActivityTime()])
      .then(([createdPost]) => {
        console.log("Posts created:", [createdPost]);
        return deletePost(createdPost.id);
      })
      .then(() => {
        return getUserPosts();
      })
      .then((posts) => {
        console.log("Updated posts:", posts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  demo();
  