export const step_progress = {
    type: "step_progress",
    category: "Utility",
    description: "Flow stepper with CTA block.",
    props: [
        { name: "title", type: "string", desc: "Top indicator text." },
        { name: "subTitle", type: "string", desc: "Main title text." },
        { name: "currentStep", type: "number", desc: "Active step index." },
    ],
    example: {
        id: "steps-1",
        type: "step_progress",
        props: {
            currentStep: 2,
            subTitle: "Join Now",
        },
    },
};
