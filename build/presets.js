// Radio buttons are not supported, use select instead.
export const view_presets = [
    {
        name: 'Complex Select',
        endpoint: 'cselect'
    },
    {
        name: 'Full Table',
        endpoint: 'select'
    },
    {
        name: 'Find Duos',
        endpoint: 'find_duos'
    },
];
export const table_presets = [
    {
        name: 'Movies',
        endpoint: 'table',
        options: {
            table: 'movies'
        }
    },
    {
        name: 'Crew',
        endpoint: 'table',
        options: {
            table: 'crew'
        }
    },
    {
        name: 'Studios',
        endpoint: 'table',
        options: {
            table: 'studios'
        }
    },
    {
        name: 'Reviews',
        endpoint: 'table',
        options: {
            table: 'reviews'
        }
    },
    {
        name: 'Genres',
        endpoint: 'table',
        options: {
            table: 'genres'
        }
    }
];
export const op_presets = [
    {
        name: 'Insert Data',
        endpoint: 'insert',
        reloadable: true,
        form: {
            header: 'Insert Data',
            fields: [
                {
                    name: 'table',
                    type: 'select',
                    send: false,
                    label: 'Table:',
                    updater: true,
                    options: [
                        'crew',
                        'movies',
                        'genres',
                        'reviews',
                        'studios'
                    ]
                },
                {
                    name: 'id',
                    type: 'text',
                    label: 'ID:',
                    nullable: true
                },
                {
                    name: 'first_name',
                    type: 'text',
                    label: 'First Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false
                },
                {
                    name: 'middle_name',
                    type: 'text',
                    label: 'Middle Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false
                },
                {
                    name: 'last_name',
                    type: 'text',
                    label: 'Last Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false
                },
                {
                    name: 'name',
                    type: 'text',
                    label: 'Movie Title:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'rating',
                    type: 'text',
                    label: 'Rating:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'genre_id',
                    type: 'text',
                    label: 'Genre ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'release_year',
                    type: 'text',
                    label: 'Release Year:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'company_id',
                    type: 'text',
                    label: 'Company ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'director_id',
                    type: 'text',
                    label: 'Director ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'writer_id',
                    type: 'text',
                    label: 'Writer ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'star_id',
                    type: 'text',
                    label: 'Star ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'review_id',
                    type: 'text',
                    label: 'Review ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false
                },
                {
                    name: 'company',
                    type: 'text',
                    label: 'Company:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'studios'; },
                    visible: false
                },
                {
                    name: 'country',
                    type: 'text',
                    label: 'Country:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'studios'; },
                    visible: false
                },
                {
                    name: 'score',
                    type: 'text',
                    label: 'Score:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'reviews'; },
                    visible: false
                },
                {
                    name: 'votes',
                    type: 'text',
                    label: 'Votes:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'reviews'; },
                    visible: false
                },
                {
                    name: 'genre',
                    type: 'text',
                    label: 'Genre:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'genres'; },
                    visible: false
                },
            ]
        }
    },
    {
        name: 'Update Entry',
        endpoint: 'update',
        reloadable: true,
        form: {
            header: 'Update Entry',
            fields: [
                {
                    name: 'table',
                    type: 'select',
                    send: false,
                    label: 'Table:',
                    updater: true,
                    options: [
                        'crew',
                        'movies',
                        'genres',
                        'reviews',
                        'studios'
                    ]
                },
                {
                    name: 'id',
                    type: 'text',
                    label: 'Where ID is'
                },
                {
                    name: 'info',
                    type: 'label',
                    label: 'Enter updated values, leave blank to leave unmodified.'
                },
                {
                    name: 'first_name',
                    type: 'text',
                    label: 'First Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'middle_name',
                    type: 'text',
                    label: 'Middle Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'last_name',
                    type: 'text',
                    label: 'Last Name:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'crew'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'name',
                    type: 'text',
                    label: 'New Title:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'rating',
                    type: 'text',
                    label: 'Rating:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'genre_id',
                    type: 'text',
                    label: 'Genre ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'release_year',
                    type: 'text',
                    label: 'Release Year:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'company_id',
                    type: 'text',
                    label: 'Company ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'director_id',
                    type: 'text',
                    label: 'Director ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'writer_id',
                    type: 'text',
                    label: 'Writer ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'star_id',
                    type: 'text',
                    label: 'Star ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'review_id',
                    type: 'text',
                    label: 'Review ID:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'movies'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'company',
                    type: 'text',
                    label: 'Company:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'studios'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'country',
                    type: 'text',
                    label: 'Country:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'studios'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'score',
                    type: 'text',
                    label: 'Score:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'reviews'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'votes',
                    type: 'text',
                    label: 'Votes:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'reviews'; },
                    visible: false,
                    nullable: true
                },
                {
                    name: 'genre',
                    type: 'text',
                    label: 'Genre:',
                    visible_condition: (form) => { return form.GetFieldValue('table') == 'genres'; },
                    visible: false,
                    nullable: true
                },
            ]
        }
    },
    {
        name: 'Delete Entry',
        endpoint: 'delete',
        reloadable: true,
        form: {
            header: 'Delete Entry',
            fields: [
                {
                    name: 'table',
                    type: 'select',
                    label: 'Table:',
                    options: [
                        'crew',
                        'movies',
                        'genres',
                        'reviews',
                        'studios'
                    ]
                },
                {
                    name: 'id',
                    type: 'text',
                    label: 'ID:'
                }
            ]
        }
    },
    {
        name: 'Custom Query',
        endpoint: 'query',
        reloadable: true,
        form: {
            header: 'Custom Query',
            fields: [
                {
                    name: 'info',
                    type: 'label',
                    label: 'foobar'
                },
                {
                    name: 'query',
                    type: 'text',
                    label: 'Query:'
                }
            ]
        }
    }
];
