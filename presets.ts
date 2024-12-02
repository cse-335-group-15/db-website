import {View} from './view-manager.js'

// Radio buttons are not supported, use select instead.
export const view_presets: Array<View> = [
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
]

export const op_presets: Array<View> = [
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
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'crew'},
                    visible: false
                },
                {
                    name: 'middle_name',
                    type: 'text',
                    label: 'Middle Name:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'crew'},
                    visible: false
                },
                {
                    name: 'last_name',
                    type: 'text',
                    label: 'Last Name:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'crew'},
                    visible: false
                },
                {
                    name: 'name',
                    type: 'text',
                    label: 'Movie Title:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'rating',
                    type: 'text',
                    label: 'Rating:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'genre_id',
                    type: 'text',
                    label: 'Genre ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'release_year',
                    type: 'text',
                    label: 'Release Year:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'company_id',
                    type: 'text',
                    label: 'Company ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'director_id',
                    type: 'text',
                    label: 'Director ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'writer_id',
                    type: 'text',
                    label: 'Writer ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'star_id',
                    type: 'text',
                    label: 'Star ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'review_id',
                    type: 'text',
                    label: 'Review ID:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'movies'},
                    visible: false
                },
                {
                    name: 'company',
                    type: 'text',
                    label: 'Company:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'studios'},
                    visible: false
                },
                {
                    name: 'country',
                    type: 'text',
                    label: 'Country:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'studios'},
                    visible: false
                },
                {
                    name: 'score',
                    type: 'text',
                    label: 'Score:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'reviews'},
                    visible: false
                },
                {
                    name: 'votes',
                    type: 'text',
                    label: 'Votes:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'reviews'},
                    visible: false
                },
                {
                    name: 'genre',
                    type: 'text',
                    label: 'Genre:',
                    visible_condition: (form) => {return form.GetFieldValue('table') == 'genres'},
                    visible: false
                },
            ]
        }
    },
    {
        name: 'Update Review',
        endpoint: 'update',
        reloadable: true,
        form: {
            header: 'Update Review',
            fields: [
                {
                    name: 'votes',
                    type: 'text',
                    label: 'Vote Count:'                    
                },
                {
                    name: 'score',
                    type: 'text',
                    label: 'Score:'
                },
                {
                    name: 'movie_id',
                    type: 'text',
                    label: 'Movie ID:'
                }
            ]
        }
    },
    {
        name: 'Delete Movie',
        endpoint: 'delete',
        reloadable: true,
        form: {
            header: 'Delete Movie',
            fields: [
                {
                    name: 'comparison',
                    type: 'text',
                    label: 'Attribute:'
                },
                {
                    name: 'input',
                    type: 'text',
                    label: 'Value:'
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
                    name: 'query',
                    type: 'text',
                    label: 'Query:'
                }
            ]
        }
    }
]