var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

// var HelloWorld = React.createClass({
//   render: function() {
//     return (
//       <div> Hello {this.props.name} </div>
//     )
//   }
// });

// // render profile picture
// var ProfilePic = React.createClass({
//   render: function() {
//     return <img src={this.props.imageUrl} style={{ height: 100, width: 100}} />
//   }
// });


// var Link = React.createClass({
//   changeURL: function() {
//     window.location.replace(this.props.href);
//   },
//   render: function() {
//     return (
//       <span style={{ color: 'blue', cursor: 'pointer' }}
//       onClick={this.changeURL}>
//         {this.props.children}
//       </span>
//     )
//   }
// });

// // profile link
// var ProfileLink = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <Link href={'https://www.github.com/' + this.props.username }>
//           { this.props.username }
//         </Link>
//       </div>
//     )
//   }
// });

// var ProfileName = React.createClass({
//   render: function() {
//     return (
//       <div>{this.props.name}</div>
//     )
//   }
// });

// var Avatar = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <ProfilePic imageUrl={this.props.image} />
//         <ProfileName name={this.props.name} />
//         <ProfileLink username={this.props.username} />
//       </div>
//     )
//   }
// });

// <Avatar
  // name="Doron"
  // image="https://avatars2.githubusercontent.com/u/2269831"
  // username="doron2402" />,

ReactDOM.render(
    routes,
  document.getElementById('app')
)

