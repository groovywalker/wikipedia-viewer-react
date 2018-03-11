var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = "https://en.wikipedia.org/w/api.php?";

$(document).ready(function () {
  var Headline = function (_React$Component) {
    _inherits(Headline, _React$Component);

    function Headline() {
      _classCallCheck(this, Headline);

      return _possibleConstructorReturn(this, (Headline.__proto__ || Object.getPrototypeOf(Headline)).apply(this, arguments));
    }

    _createClass(Headline, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement(
            'h1',
            null,
            'Wikipedia Viewer'
          )
        );
      }
    }]);

    return Headline;
  }(React.Component);

  var Form = function (_React$Component2) {
    _inherits(Form, _React$Component2);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this2 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

      _this2.state = { value: '' };

      _this2.handleChange = _this2.handleChange.bind(_this2);
      _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
      return _this2;
    }

    _createClass(Form, [{
      key: 'handleChange',
      value: function handleChange(event) {
        this.setState({ value: event.target.value });
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(event) {
        console.log("Value submitted: " + this.state.value);

        event.preventDefault();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log("Did mount");

        $("#search-form").on("submit", function (event) {

          event.preventDefault();

          $("#search-result").empty();

          $.ajax({
            url: url,
            data: {
              action: "query",
              prop: "extracts|info",
              exsentences: 3,
              exintro: 1,
              explaintext: 1,
              exlimit: 20,
              inprop: "url",
              format: "json",
              utf8: 1,
              formatversion: 2,
              generator: "search",
              gsrsearch: $("#search-bar").val(),
              gsrwhat: "text"
            },
            type: "GET",
            dataType: "jsonp"
          }).done(function (json) {

            // This is line is check if json was retrieved (debugging)
            console.log(json.query.pages[0]);

            var query = json.query.pages;

            query.forEach(function (val) {

              $("#search-result").append("<div id='search-returned'><h3><a href=" + val.fullurl + " target= '_blank'>" + val.title + "</a></h3><p>" + val.extract + "</p></div></a>");
            });
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement(
              'form',
              { id: 'search-form', onSubmit: this.handleSubmit },
              React.createElement('input', { type: 'text', name: 'search', className: 'form-control',
                id: 'search-bar', value: this.state.value, onChange: this.handleChange }),
              React.createElement('input', { type: 'submit', value: 'Submit', className: 'btn btn-primary',
                id: 'search-submit' }),
              React.createElement(
                'a',
                { href: 'https://en.wikipedia.org/wiki/Special:Random', target: '_blank', className: 'btn btn-primary', id: 'search-random' },
                'I\'m feeling lucky!'
              )
            )
          ),
          React.createElement('div', { id: 'search-result' })
        );
      }
    }]);

    return Form;
  }(React.Component);

  var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(Headline, null),
          React.createElement(Form, null)
        );
      }
    }]);

    return App;
  }(React.Component);

  ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
});

// let xmlHttp = new XMLHttpRequest();;
// xmlHttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     let data = JSON.parse(this.responseText);

//     // document.getElementById("search-returned").innerHTML = this.state.title;
//   }


//   xmlHttp.open("GET", "https://en.wikipedia.org/w/api.php?/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&utf8=1&inprop=url&exsentences=3&exintro=1&explaintext=1&gsrsearch=" + this.state.value + "&gsrwhat=text", true);

//   xmlHttp.send();
// }


//     let url = "https://en.wikipedia.org/w/api.php?/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&utf8=1&inprop=url&exsentences=3&exintro=1&explaintext=1&gsrsearch=" + this.state.value + "&gsrwhat=text";

//     let url2 = "https://en.wikipedia.org/w/api.php?/w/api.php?";

//     let url3 = "https://en.wikipedia.org/w/api.php?/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&utf8=1&inprop=url&exsentences=3&exintro=1&explaintext=1&gsrsearch=" + "godzilla" + "&gsrwhat=text";

//     let url4 = "https://en.wikipedia.org/w/api.php?/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&utf8=1&inprop=url&exsentences=3&exintro=1&explaintext=1&gsrwhat=text&gsrsearch=";

//     fetch(url4 + this.state.value)
//       .then((response) => {
//       response.json()
//     })
//       .then((data) => {
//       this.setState({json: data});
//     });