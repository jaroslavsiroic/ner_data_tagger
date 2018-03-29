
const defaultLinks = [{
        title: 'NER tagger',
        url: '/'
    },
    {
        title: 'About',
        url: 'about'
    }
];

const guestLinks = defaultLinks.concat([{
        title: 'Login',
        url: 'login',
        alignRight: true
    },
    {
        title: 'Register',
        url: 'register_user',
        alignRight: true
    }
]);

const userLinks = defaultLinks.concat([{
        title: 'Logout',
        url: 'logout',
        alignRight: true
    }
]);

const initialState = {
    links: guestLinks
};

function navigationReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_LOGIN':
            state = Object.assign({}, state, {links: userLinks});
        break;
        case 'LOGOUT':
            state = Object.assign({}, state, {links: guestLinks});
        break;
    }
    return state;
}

module.exports = navigationReducer;