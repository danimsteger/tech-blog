const newComment = async (event) => {
  try {
    event.preventDefault();
    console.log('step 1');

    const content = document.querySelector('#comment').value.trim();
    console.log('step 2');
    console.log(content);

    const blog_id = window.location.pathname.split('/').pop();
    console.log('this is the blog id?', blog_id);

    if (content) {
      console.log('step 3');

      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('step 4');

      console.log(response);
      if (response.ok) {
        console.log('step 5');

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
