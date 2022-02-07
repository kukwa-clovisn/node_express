let posts = []

function addpost() {
     alert('dlafkjl')
     if (username.value !== '' && post.value !== '') {
          posts.push({
               post: 'blog',
               title: title.value,
               details: post.value,
               author: username.value
          })
     }
}
