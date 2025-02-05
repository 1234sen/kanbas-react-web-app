export default function Modules() {
    console.log("Modules component rendering...");

    return (
      <div>
        <h1>Modules</h1>
        {/* Add Collapse All button, View Progress button, etc. */}
        <ul id="wd-modules">
          {/* Week 1 */}
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">CONTENT</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Video: What is Web Development?</li>
                  <li className="wd-content-item">Read: Introduction to HTML</li>
                  <li className="wd-content-item">Exercise: Create your first HTML page</li>
                </ul>
              </li>
            </ul>
          </li>
          {/* Week 2 */}
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn the basics of CSS</li>
                  <li className="wd-content-item">Understand the DOM</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">CONTENT</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Video: Introduction to CSS</li>
                  <li className="wd-content-item">Read: Understanding the DOM</li>
                  <li className="wd-content-item">Exercise: Styling your first webpage</li>
                </ul>
              </li>
            </ul>
          </li>
          {/* Week 3 */}
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to JavaScript</li>
                  <li className="wd-content-item">Understanding Events</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">CONTENT</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Video: Introduction to JavaScript</li>
                  <li className="wd-content-item">Read: Basics of Event Handling</li>
                  <li className="wd-content-item">Exercise: Interactive Webpage</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
  
  
  