const newComment = async (event) => {
  try {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();

    const blog_id = window.location.pathname.split('/').pop();

    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      if (response.ok) {
        document.location.replace(`/blog/${blog_id}`);
      } else {
        alert('failed to add comment');
      }
    }
  } catch (err) {
    console.error('error in submitting comment', err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const commentFormElement = document.querySelector('.comment-form');

  if (commentFormElement) {
    commentFormElement.addEventListener('submit', newComment);
  } else {
    console.error('comment form element not found');
  }
});
