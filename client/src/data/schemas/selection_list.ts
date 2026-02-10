export const selection_list = {
    type: "selection_list",
    category: "Utility",
    description: "Selectable list of cards.",
    props: [
        { name: "title", type: "string", desc: "List title." },
        {
            name: "items",
            type: "array",
            desc: "List of {id, label, icon, description}.",
        },
        { name: "selectedId", type: "string", desc: "ID of selected item." },
    ],
    example: {
        id: "sel-1",
        type: "selection_list",
        props: {
            title: "Subject Category",
            items: [
                { id: "1", label: "High School", icon: "🎨" },
                { id: "2", label: "College", icon: "🎓" },
            ],
            selectedId: "2",
        },
    },
};
