const auth = require('jsonwebtoken')
const moment = require("moment-timezone")
const { v4: uuidv4 } = require('uuid');
const prisma = require('../prisma');

// generate token for reset password
async function generateResetToken () {
    const user = this

    /* Reset token generation */
    const resetTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_HOURS, 'hours');

    const refreshPayload = {
        _id: user._id,
        iat: moment().unix(),
        exp: resetTokenExpires.unix(),
        type: 'reset_password',
    };

    const resetToken = auth.sign(refreshPayload, process.env.JWT_SECRET)

    let token = {
        blacklisted: false,
        token: resetToken,
        user: user._id,
        expires: resetTokenExpires,
        type: 'reset_password',
    }

    // insert/save generated token in tokens table

    return resetToken;
}


async function generateAuthToken () {
    // Generate an auth token for the user
    const user = this
    const token = auth.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    return token
}

async function generateAuthTokens () {
    const user = this
    /* Access token generation */
    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');

    const accessPayload = {
        _id: user._id,
        iat: moment().unix(),
        exp: accessTokenExpires.unix(),
        type: 'access',
    };
    const accessToken = auth.sign(accessPayload, process.env.JWT_SECRET)

    /* Refresh token generation */
    const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_HOURS, 'hours');

    const refreshPayload = {
        _id: user._id,
        iat: moment().unix(),
        exp: refreshTokenExpires.unix(),
        type: 'refresh',
    };

    const refreshToken = auth.sign(refreshPayload, process.env.JWT_SECRET)

    let token = {
        blacklisted: false,
        token: refreshToken,
        user: user._id,
        expires: refreshTokenExpires,
        type: 'refresh',
    }

    // Delete all the refresh tokens for the user that are expired

    // Save new generated token

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
}

async function startSession () {
    const user = this;
    let obj = {
        user_id: user._id,
        session_id: uuidv4(),
        routes: [],
        session_status: 'started'
    }

    // insert new session in table

    return obj;
}

module.exports = {
    generateAuthToken,
    generateAuthTokens,
    generateResetToken,
    startSession
}