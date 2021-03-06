import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Dimmer,
  Modal,
  List,
  Loader,
  Icon,
  Divider,
  Message
} from "semantic-ui-react";
import { userActions } from "../actions/userActions";

import Post from "../components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { FollowButton } from "../components/FollowButton";
import Messages from "../components/Messages";
import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
import FollowingFollowerList from "../components/FollowingFollowerList";

hashtag(linkify);
mention(linkify);

const linkifyOptions = {
  formatHref: function(href, type) {
    if (type === "hashtag") {
      href = "/hashtags/" + href.substring(1);
    }
    if (type === "mention") {
      href = "/" + href.substring(1);
    }
    return href;
  },
  attributes: {
    target: {
      url: "_blank"
    }
  }
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      newposts:[],
      profilepicurl: '',
      bool: false
    };
  }
  // state = { username: "" };

  getFollowings = () => {
    const { dispatch, userProfileData } = this.props;
    dispatch(userActions.getUserProfileFollowings(userProfileData.data._id));
  };

  getFollowers = () => {
    const { dispatch, userProfileData } = this.props;
    dispatch(userActions.getUserProfileFollowers(userProfileData.data._id));
  };

  componentDidMount = () => {
    const { dispatch, userProfileData, match } = this.props;
    if (userProfileData.data.username !== match.params.username) {
      dispatch(userActions.getUserProfileData(match.params.username));
    }
  };

  async componentDidUpdate() {
    if (this.state.bool === false) {
      let tempprofilepicurl;
      let newposts=[];
      const { userProfileData } = this.props;
      if(userProfileData.data._id)
      {
        if(userProfileData.data.profilePicture!=="person.png")
        {
      this.downloaduserProfileDataProfilePic(userProfileData.data._id)
        .then(async (res) => {
          tempprofilepicurl=res;
          newposts=userProfileData.data.posts;
          for(let i=0; i<userProfileData.data.posts.length;i++)
          {
            newposts[i].photourl=await this.downloadPostPicture(userProfileData.data.posts[i]);
            newposts[i].profilepic=res;
          }
            this.setState({...this.state, profilepicurl: tempprofilepicurl, bool: true,newposts: newposts })
        });
      }
      else{
        newposts=userProfileData.data.posts;
        for(let i=0; i<userProfileData.data.posts.length;i++)
        {
          newposts[i].photourl=await this.downloadPostPicture(userProfileData.data.posts[i]);
          newposts[i].profilepic="person.png";
        }
          this.setState({...this.state, profilepicurl: "person.png", bool: true,newposts: newposts })
      }
    }
    }
  }

  fetchData = () => {
    const { dispatch, userProfileData } = this.props;
    const lastId =
      userProfileData.data.posts[userProfileData.data.posts.length - 1]._id;

    dispatch(
      userActions.getUserPosts({ userId: userProfileData.data._id, lastId })
    );
  };

  async downloadUserProfilePic(userId) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    };
    return fetch("/api/user/downloadUserProfilePic", requestOptions)
      .then(async (response) => {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      })
  }

  async downloadPostPicture(posts) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posts }),
    };
    return fetch("/api/post/downloadPostPicture", requestOptions)
      .then(async (response) => {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      })
  }


  render() {
    const { userProfileData, fetchingUserData, alert } = this.props;
    const hasMore =
      userProfileData.data.postsCount === userProfileData.data.posts.length
        ? false
        : true;
    if (alert.type) {
      return (
        <div className="container">
          <Messages alert={alert} />
        </div>
      );
    }
    if (userProfileData.loadingUser || fetchingUserData) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      const posts = this.state.newposts.map(post => {
        return (
          <Modal
            key={post._id}
            size="small"
            trigger={
              <div className="gallery-item">
                <img
                src={post.photourl}
                className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <Icon name="heart" /> {post.likes}
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <Icon name="comment" /> {post.comments}
                    </li>
                  </ul>
                </div>
              </div>
            }
          >
            <Post
              post={{
                ...post,
                author: [
                  {
                    profilePicture: userProfileData.data.profilePicture,
                    username: userProfileData.data.username,
                    _id: userProfileData.data._id
                  }
                ]
              }}
            />
          </Modal>
        );
      });

      const followingList = userProfileData.data.follwingUsers.length
        ? userProfileData.data.follwingUsers.map(({ user }) => (
            <FollowingFollowerList
              key={user._id}
              user={user}
            ></FollowingFollowerList>
          ))
        : "No followings";

      const followerList = userProfileData.data.followerUsers.length
        ? userProfileData.data.followerUsers.map(({ user }) => (
            <FollowingFollowerList
              key={user._id}
              user={user}
            ></FollowingFollowerList>
          ))
        : "No followers";

      return (
        <Fragment>
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image">
                {this.state.profilepicurl !=="person.png"?
                    <img src={this.state.profilepicurl} alt="profilepicture" />
                    :<img src={"/images/profile-picture/100x100/person.png"} alt="profilepicture" />}
                </div>

                <div className="profile-user-settings">
                  <h1 className="profile-user-name">
                    {userProfileData.data.username}
                  </h1>

                  <FollowButton
                    userId={userProfileData.data._id}
                  ></FollowButton>
                </div>

                <div className="profile-stats">
                  <ul>
                    <li>
                      <span className="profile-stat-count">
                        {userProfileData.data.postsCount}
                      </span>{" "}
                      posts
                    </li>
                    <Modal
                      trigger={
                        <li onClick={this.getFollowers}>
                          <span className="profile-stat-count">
                            {userProfileData.data.followers}
                          </span>{" "}
                          followers
                        </li>
                      }
                    >
                      <Modal.Header>Followers</Modal.Header>
                      <Modal.Content scrolling>
                        <Modal.Description>
                          <List selection verticalAlign="middle" size="huge">
                            {followerList}
                          </List>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                    <Modal
                      trigger={
                        <li onClick={this.getFollowings}>
                          <span className="profile-stat-count">
                            {userProfileData.data.followings}
                          </span>{" "}
                          following
                        </li>
                      }
                    >
                      <Modal.Header>Following</Modal.Header>
                      <Modal.Content scrolling>
                        <Modal.Description>
                          <List selection verticalAlign="middle" size="huge">
                            {followingList}
                          </List>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </ul>
                </div>

                <div className="profile-bio">
                  <div className="profile-real-name">
                    {userProfileData.data.firstName +
                      " " +
                      userProfileData.data.lastName}
                  </div>
                  <div className="profile-bio-description">
                    <Linkify options={linkifyOptions}>
                      {userProfileData.data.bio}
                    </Linkify>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              {userProfileData.data.postsCount === 0 ? (
                <Message info size="large">
                  This user has no posts yet.
                </Message>
              ) : (
                <InfiniteScroll
                  className="gallery"
                  dataLength={userProfileData.data.posts.length} //This is important field to render the next data
                  next={this.fetchData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  {posts}
                </InfiniteScroll>
              )}
            </div>
          </main>
          <Divider hidden></Divider>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  userProfileData: state.userProfile,
  fetchingUserData: state.user.loadingUser,
  user: state.user.data,
  alert: state.alert
});

const connectedProfilePage = connect(mapStateToProps)(UserProfile);
export { connectedProfilePage as default };
