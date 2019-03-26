import { Application } from 'probot';

export default function(application: Application) {
    application.on('pull_request.opened', async (context) => {
        console.log(context);

        // const checkPayload = context.repo({ name : 'Checker', 'head_sha' : context.payload.pull_request.head_sha });
        // const checkListComment = context.repo({ body : 'poop', 'commit_id' : context.payload.sha });

        // const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
        // await context.github.issues.createComment(issueComment);
    })
}
