const updatePost = async (event) => {
  try {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const blog_id = window.location.pathname.split('/').pop();

    if (title && content) {
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          content,
          title,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('failed to update post');
      }
    } else {
      alert('failed to modify the post');
    }
  } catch (err) {
    console.error('error in updating post');
  }
};

// const deletePost = async (event) => {
//   try {
//   } catch (err) {
//     console.error('error in updating post');
//   }
// };

document.addEventListener('DOMContentLoaded', () => {
  const updateButton = document.querySelector('#updateButton');

  if (updateButton) {
    console.log('working!');
    updateButton.addEventListener('click', updatePost);
  } else {
    console.error('update form element not found');
    console.log('not working');
  }

  //   const deletePostButton = document.querySelector('#deletePostButton');

  //   if (deletePostButton) {
  //     deletePostButton.addEventListener('click', deleteButton);
  //   } else {
  //     console.error('blog form element not found');
  //     console.log('not working');
  //   }
});
