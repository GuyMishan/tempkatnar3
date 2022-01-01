import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
    Button,
    Modal,
    Dimmer,
    Icon,
    Loader,
    List,
    Divider,
    Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { userActions } from "../actions/userActions";
import { EditProfileModal } from "../components/EditProfileModal";
import Messages from "../components/Messages";
import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
import FollowingFollowerList from "../components/FollowingFollowerList";
import Post from "../components/Post/Post";

export default function ProfilePic(props) {

    const downloadProfilePic = () => {
        const { dispatch, user } = props;
        dispatch(userActions.downloadProfilePic(user.data._id));
    };

    useEffect = (() => {
        downloadProfilePic();
    }, [props])

    return (
        <div className="profile-image">
            <img
                src={`/images/profile-picture/100x100/${user.data.profilePicture}`}
                alt=""
            />
        </div>
    )
}