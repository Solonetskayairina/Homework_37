    const ref = {
        inputId: document.querySelector('#post'),
        blockPost: document.querySelector('#blockPost')
    };

    async function getFile(url) {
        try {
            const post = +ref.inputId.value;

            if (isNaN(post) || post < 1 || post > 100) {
                const blockPostValidation = document.createElement('p');
                blockPostValidation.className = 'block_post';
                blockPostValidation.innerHTML = 'Please enter a valid Post ID (1-100).';

                ref.blockPost.innerHTML = '';

                ref.blockPost.appendChild(blockPostValidation);
            } else {
                const request = await fetch(url);
                const response = await request.json();

                ref.blockPost.innerHTML = `
                <h2>${response.title}</h2>
                <p>${response.body}</p>`;

                const buttonComments = document.createElement('button');
                buttonComments.className = "button_comments";
                buttonComments.innerHTML = 'Comments';

                buttonComments.addEventListener('click', async () => {
                    try {
                        const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${response.id}`;
                        const commentsRequest = await fetch(commentsUrl);
                        const comments = await commentsRequest.json();

                        comments.forEach(comment => {
                            const commentElement = document.createElement('div');
                            commentElement.className = "block_comments";
                            commentElement.innerHTML = `
                                <p>Name: ${comment.name}</p>
                                <p>Email: ${comment.email}</p>
                                <p>${comment.body}</p>`;
                            ref.blockPost.appendChild(commentElement);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
                ref.blockPost.appendChild(buttonComments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    ref.inputId.addEventListener('change', async () => {
        try {
            await getFile(`https://jsonplaceholder.typicode.com/posts/${ref.inputId.value}`);
        } catch (error) {
            console.log(error);
        }
    })