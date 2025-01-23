
import ReactImage from "../../../assets/react.jpg"

export default function Lab1() {
    return (
      <div id="wd-lab1">
        <h2>Lab 1</h2>
        <h3>HTML Examples</h3>
  
        {/* Paragraph Examples */}
        <div id="wd-p-tag">
          <h4>Paragraph Tag</h4>
          <p id="wd-p-1">
            The paragraph tag is a block-level element in HTML, used to define paragraphs of text.
          </p>
          <p id="wd-p-2">
            This is the first paragraph. The paragraph tag is used to format
            vertical gaps between long pieces of text like this one.
          </p>
          <p id="wd-p-3">
            This is the second paragraph. Even though there is a deliberate white
            gap between the paragraph above and this paragraph, by default
            browsers render them as one contiguous piece of text as shown here on
            the right.
          </p>
          <p id="wd-p-4">
            This is the third paragraph. Wrap each paragraph with the paragraph
            tag to tell browsers to render the gaps.
          </p>
        </div>
  
        {/* List Examples */}
        <div id="wd-lists">
          <h4>List Tags</h4>
  
          {/* Ordered List */}
          <h5>Ordered List Tag</h5>
          How to make pancakes:
          <ol id="wd-pancakes">
            <li>Mix dry ingredients.</li>
            <li>Add wet ingredients.</li>
            <li>Stir to combine.</li>
            <li>Heat a skillet or griddle.</li>
            <li>Pour batter onto the skillet.</li>
            <li>Cook until bubbly on top.</li>
            <li>Flip and cook the other side.</li>
            <li>Serve and enjoy!</li>
          </ol>
  
          My favorite recipe:
          <ol id="wd-your-favorite-recipe">
            <li>Prepare the ingredients: flour, sugar, eggs, and butter.</li>
            <li>Preheat the oven to 350°F (175°C).</li>
            <li>Mix the dry and wet ingredients separately.</li>
            <li>Combine the mixtures and stir until smooth.</li>
            <li>Pour the batter into a greased baking dish.</li>
            <li>Bake for 25-30 minutes.</li>
            <li>Let it cool, then serve.</li>
          </ol>
  
          {/* Unordered List */}
          <h5>Unordered List Tag</h5>
          My favorite books (in no particular order)
          <ul id="wd-my-books">
            <li>Dune</li>
            <li>Lord of the Rings</li>
            <li>Ender's Game</li>
            <li>Red Mars</li>
            <li>The Forever War</li>
          </ul>
  
          My favorite books (in no particular order)
          <ul id="wd-your-books">
            <li>To Kill a Mockingbird</li>
            <li>1984</li>
            <li>The Great Gatsby</li>
            <li>Harry Potter and the Philosopher's Stone</li>
            <li>Brave New World</li>
          </ul>
        </div>

        {/* form */}
        <div id="wd-tables">
  <h4>Table Tag</h4>
  <table border={1} width="100%">
    <thead>
      <tr>
        <th>Quiz</th>
        <th>Topic</th>
        <th>Date</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Q1</td>
        <td>HTML</td>
        <td>2/3/21</td>
        <td>85</td>
      </tr>
      <tr>
        <td>Q2</td>
        <td>CSS</td>
        <td>2/10/21</td>
        <td>90</td>
      </tr>
      <tr>
        <td>Q3</td>
        <td>JavaScript</td>
        <td>2/17/21</td>
        <td>95</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={3}><b>Average</b></td>
        <td>90</td>
      </tr>
    </tfoot>
  </table>
</div>


<div id="wd-images">
  <h4>Image tag</h4>
  Loading an image from the internet: <br />
  <img id="wd-starship" width="400px"
   src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
  <br />
  Loading a local image:
  <br />
  <img src={ReactImage} alt="React Logo" width={200} />
</div>

<div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" value="123@#$asd" id="wd-text-fields-password" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input
                        type="text"
                        placeholder="Doe"
                        value="Wonderland"
                        title="The last name"
                        id="wd-text-fields-last-name"
                    />
                </form>
            </div>

            {/* Textarea Section */}
            <div id="wd-textarea-section">
                <h5>Text Boxes</h5>
                <label>Biography:</label><br />
                <textarea
                    id="wd-textarea"
                    cols={30}
                    rows={10}
                    placeholder="Biography"
                    title="tooltip"
                >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </textarea>
            </div>

            <h5 id="wd-buttons">Buttons</h5>
<button type="button"
        onClick={() => alert("Life is Good!")}
        id="wd-all-good">
  Hello World!
</button>

<div id="wd-forms">
  <h4>Form Elements</h4>
  <form id="wd-text-fields">
    {/* 其他表单字段 */}
    {/* Checkboxes */}
    <div id="wd-checkboxes">
      <h5>Checkboxes</h5>
      <label>Favorite movie genre:</label><br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label htmlFor="wd-chkbox-comedy">Comedy</label><br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
      <label htmlFor="wd-chkbox-drama">Drama</label><br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
    </div>

    {/* Radio Buttons */}
    <div id="wd-radio-buttons">
      <h5>Radio buttons</h5>
      <label>Favorite movie genre:</label><br />
      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label><br />
      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label><br />
      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
    </div>
  </form>
</div>
<h5>Select many</h5>
<label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br/>
<select multiple id="wd-select-many-genre">
  <option value="COMEDY" selected>Comedy</option>
  <option value="DRAMA">Drama</option>
  <option value="SCIFI" selected>Science Fiction</option>
  <option value="FANTASY">Fantasy</option>
</select>

<h4 id="wd-dropdowns">Dropdowns</h4>

<h5>Select one</h5>
<label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br/>
<select id="wd-select-one-genre">
  <option value="COMEDY">Comedy</option>
  <option value="DRAMA">Drama</option>
  <option value="SCIFI" selected>Science Fiction</option>
</select>


<h4>Other HTML field types</h4>
<form id="wd-other-html-fields">
  <label htmlFor="wd-text-fields-email">Email:</label>
  <input 
    type="email" 
    placeholder="jdoe@somewhere.com" 
    id="wd-text-fields-email"
  />
  <br />

  <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
  <input 
    type="number" 
    value="100000" 
    placeholder="1000" 
    id="wd-text-fields-salary-start"
  />
  <br />

  <label htmlFor="wd-text-fields-rating">Rating:</label>
  <input 
    type="range" 
    value="4" 
    max="5" 
    id="wd-text-fields-rating"
  />
  <br />

  <label htmlFor="wd-text-fields-dob">Date of birth:</label>
  <input 
    type="date" 
    value="2000-01-21" 
    id="wd-text-fields-dob"
  />
  <br />
</form>
<h4>Anchor tag</h4>
Please
<a 
  href="https://www.lipsum.com" 
  id="wd-lipsum"
  target="_blank"
>
  click here
</a> 
to get dummy text.
<br />
And visit my 
<a 
  href="https://github.com/1234sen/kanbas-react-web-app.git" 
  id="wd-github"
  target="_blank"
>
  GitHub repository
</a>.



      </div>
    );
  }
  