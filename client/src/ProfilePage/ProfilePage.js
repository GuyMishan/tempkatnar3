import React, { Component, Fragment } from "react";
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

hashtag(linkify);
mention(linkify);

const linkifyOptions = {
  formatHref: function (href, type) {
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

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newposts:[],
      profilepicurl: '',
      bool: false
    };
  }

  componentDidMount = () => {
    document.title = "Profile | social-network";
  };

  async componentDidUpdate() {
    if (this.state.bool === false) {
      let tempprofilepicurl;
      let newposts=[];
      const { user } = this.props;
      if(user.data._id)
      {
        if(user.data.profilePicture!=="person.png")
        {
      this.downloadUserProfilePic(user.data._id)
        .then(async (res) => {
          tempprofilepicurl=res;
          newposts=user.data.posts;
          for(let i=0; i<user.data.posts.length;i++)
          {
            newposts[i].photourl=await this.downloadPostPicture(user.data.posts[i]);
            newposts[i].profilepic=res;
          }
            this.setState({...this.state, profilepicurl: tempprofilepicurl, bool: true,newposts: newposts })
        });
      }
      else{
        newposts=user.data.posts;
        for(let i=0; i<user.data.posts.length;i++)
        {
          newposts[i].photourl=await this.downloadPostPicture(user.data.posts[i]);
          newposts[i].profilepic="person.png";
        }
          this.setState({...this.state, profilepicurl: "person.png", bool: true,newposts: newposts })
      }
    }
    }
  }

  fetchData = () => {
    const { dispatch, user } = this.props;
    const lastId = user.data.posts[user.data.posts.length - 1]._id;
    dispatch(userActions.getPosts({ userId: user.data._id, lastId }));
  };

  getFollowings = () => {
    const { dispatch, user } = this.props;
    dispatch(userActions.getFollowings(user.data._id));
  };

  getFollowers = () => {
    const { dispatch, user } = this.props;
    dispatch(userActions.getFollowers(user.data._id));
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
    const { user, alert } = this.props;

    const hasMore =
      user.data.postsCount === user.data.posts.length ? false : true;
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
              <h3>{post.photo}</h3>
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
                  profilePicture: user.data.profilePicture,
                  username: user.data.username,
                  _id: user.data._id
                }
              ]
            }}
          />
        </Modal>
      );
    });

    const followingList = user.data.follwingUsers.length
      ? user.data.follwingUsers.map(({ user }) => (
        <FollowingFollowerList
          key={user._id}
          user={user}
        ></FollowingFollowerList>
      ))
      : "No followings";

    const followerList = user.data.followerUsers.length
      ? user.data.followerUsers.map(({ user }) => (
        <FollowingFollowerList
          key={user._id}
          user={user}
        ></FollowingFollowerList>
      ))
      : "No followers";

    return (
      <div className="main">
        {user.loadingUser ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <Fragment>
            {user.deleting ? (
              <Dimmer active>
                <Loader />
              </Dimmer>
            ) : null}

            <header>
              <div className="container">
                {alert.type ? <Messages alert={alert} /> : null}
                <div className="profile">
                  <div className="profile-image">
                    {this.state.profilepicurl !=="person.png"?
                    <img src={this.state.profilepicurl} alt="profilepicture" />
                    :<img src={"/images/profile-picture/100x100/person.png"} alt="profilepicture" />}
                  </div>
                  <div className="profile-user-settings">
                    <h1 className="profile-user-name">{user.data.username}</h1>

                    <Button
                      as={Link}
                      to="/posts/upload"
                      className="profile-edit-btn"
                      size="large"
                      icon
                      labelPosition="right"
                    >
                      Add post
                      <Icon name="upload" />
                    </Button>
                    <EditProfileModal>
                      <Button
                        className="profile-edit-btn"
                        size="large"
                        icon
                        labelPosition="right"
                      >
                        Profile settings
                        <Icon name="setting" />
                      </Button>
                    </EditProfileModal>
                  </div>
                  <div className="profile-stats">
                    <ul>
                      <li>
                        <span className="profile-stat-count">
                          {user.data.postsCount}
                        </span>{" "}
                        posts
                      </li>
                      <Modal
                        trigger={
                          <li onClick={this.getFollowers}>
                            <span className="profile-stat-count">
                              {user.data.followers}
                            </span>{" "}
                            followers
                          </li>
                        }
                      >
                        <Modal.Header>Followers</Modal.Header>
                        <Modal.Content scrolling>
                          <Modal.Description>
                            <List verticalAlign="middle" size="huge">
                              {followerList}
                            </List>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                      <Modal
                        trigger={
                          <li onClick={this.getFollowings}>
                            <span className="profile-stat-count">
                              {user.data.followings}
                            </span>{" "}
                            following
                          </li>
                        }
                      >
                        <Modal.Header>Following</Modal.Header>
                        <Modal.Content scrolling>
                          <Modal.Description>
                            <List verticalAlign="middle" size="huge">
                              {followingList}
                            </List>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </ul>
                  </div>
                  <div className="profile-bio">
                    <div className="profile-real-name">
                      {user.data.firstName + " " + user.data.lastName}
                    </div>
                    <div className="profile-bio-description">
                      <Linkify options={linkifyOptions}>
                        {user.data.bio}
                      </Linkify>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main>
              <div className="container">
                {user.data.postsCount === 0 ? (
                  <Message info size="large">
                    You have no posts. Share your first picture:{" "}
                    <Button
                      as={Link}
                      to="/posts/upload"
                      className="profile-edit-btn"
                      size="large"
                      icon
                      labelPosition="right"
                    >
                      Add post
                      <Icon name="upload" />
                    </Button>
                  </Message>
                ) : (
                  <InfiniteScroll
                    className="gallery"
                    dataLength={user.data.posts.length} //This is important field to render the next data
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  alert: state.alert
});

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as default };
