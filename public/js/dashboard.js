console.log('This is the dashboard page and the script is working!?!?!');

document.querySelector('#newPostButton').addEventListener('click', function () {
  document.querySelector('#blogPostForm').classList.toggle('hidden');
  document.querySelector('#myBlogList').classList.toggle('hidden');
});

document.querySelector('.myBlogs').addEventListener('click', function () {
  document.querySelector('#blogPostForm').classList.toggle('hidden');

  document.querySelector('#myBlogsList').classList.toggle('hidden');
});

const newPost = async (event) => {
  console.log('step1');
  try {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
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
        alert('failed to add post');
      }
    } else {
      alert('failed to add a new blog post');
    }
  } catch (err) {
    console.error('error in submitting a new blog post', err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const blogFormElement = document.querySelector('.post-form');

  if (blogFormElement) {
    blogFormElement.addEventListener('submit', newPost);
  } else {
    console.error('blog form element not found');
  }
});
