/* eslint-disable */
export default async () => {
    const t = {
        ["./models/clear-event.model"]: await import("./models/clear-event.model"),
        ["./models/comment.model"]: await import("./models/comment.model")
    };
    return { "@nestjs/swagger/plugin": { "models": [[import("./events/dto/create-event.dto"), { "CreateEventDto": { specialist_id: { required: true, type: () => String } } }], [import("./events/dto/update-event.dto"), { "UpdateEventDto": {} }], [import("./events/dto/create-comment.dto"), { "CreateCommentDto": { text: { required: true, type: () => String, maxLength: 512 } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getUser": {} } }], [import("./users/users.controller"), { "UsersController": { "selectUsers": {} } }], [import("./events/events.controller"), { "EventsController": { "getAll": { type: [t["./models/clear-event.model"].ClearEventModel] }, "getById": {}, "createEvent": { type: t["./models/clear-event.model"].ClearEventModel }, "update": { type: t["./models/clear-event.model"].ClearEventModel }, "addComment": { type: t["./models/comment.model"].CommentModel }, "recommendations": {} } }]] } };
};