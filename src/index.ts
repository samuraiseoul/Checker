import { Application } from 'probot';

export = function(application: Application) {
    application.on(['pull_request.opened', 'pull_request.reopened'], async function handleOpening (context) {
        // console.log(context.payload);

        const checkPayload = context.repo({ name : 'Checker', head_sha : context.payload.pull_request.head.sha });
        const check = await context.github.checks.create(checkPayload);

        // const state : "error" | "failure" | "pending" | "success" = "pending";
        // const statusPayload = context.repo({
        //     sha : context.payload.pull_request.head.sha,
        //     state,
        //     context: 'Checker'
        // });
        // const status = await context.github.repos.createStatus(statusPayload);

        console.log(check);

        // console.log(status);

        const body = `- [ ] Make more checklist stuff!
- [ ] More check stuff!`;
        const checkListComment = context.issue({ body });
        await context.github.issues.createComment(checkListComment);
    });

    application.on('issue_comment.edited', async function(context){
        // console.log(context.payload);
        console.log({before: context.payload.changes.body.from, after: context.payload.comment.body});

        type Status = "failure" | "success" | "neutral" | "cancelled" | "timed_out" | "action_required" | undefined;
        const conclusion : Status = context.payload.comment.body.includes('- [ ] ') ? 'neutral' : 'success';
        context.github.checks.update(context.repo({
            check_run_id: 86755066,
            conclusion,
            completed_at: '2019-03-27T23:22:00Z',
            output: {
                title: 'something changed!',
                summary: 'There was a cahnge in th comment detected and now this has updated! YAY',
                text: 'What dis?'
            }
        }));
    });
}
