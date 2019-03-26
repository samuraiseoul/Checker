import { Application } from 'probot';

export = function(application: Application) {
    application.on(['pull_request.opened', 'pull_request.reopened'], async function handleOpening (context) {
        console.log(context.payload);

        const checkPayload = context.repo({ name : 'Checker', 'head_sha' : context.payload.pull_request.head.sha });
        await context.github.checks.create(checkPayload);

        const checkListComment = context.issue({ body : '- [ ] Make more checklist stuff!' });
        await context.github.issues.createComment(checkListComment);
    });
}
