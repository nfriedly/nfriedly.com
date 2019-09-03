import React from "react";

class BlogPreview extends React.Component {
  render() {
    return (
      <li>
        <a href="/techblog/2015/07/build-a-diy-esp8266ex-esp-01-dev-test-programming-board/">
          <div className="clip">
            <img
              src="/static/img/blog/esp-mb/zoom.jpg"
              style={{
                maxWidth: "300px"
              }}
              alt="ESP-01"
            />
          </div>
          <h3>DIY ESP8266 ESP-01 Programing / Test board</h3>
          <p>
            NodeMCU and other ESP8266 modules are starting to become very
            popular because they offer an embedded development platform with a
            CPU+RAM+Storage+WiFi all in one for (considerably) less than the
            price of an Arduino. There are a number of breadboard-friendly
            modules with all pins exposed (and more coming soon.)
          </p>
          <p>
            However, this post is about the breadboard-unfriendly ESP-01 module.
            It only has two GPIO pins (four if you include the TX & RX pins),
            but it's smaller and most importantly, cheaper.{" "}
          </p>
        </a>
      </li>
    );
  }
}

export default BlogPreview;
