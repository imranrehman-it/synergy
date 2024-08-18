# Synergy
This web application is a live preview Markdown editor designed to streamline the creation of Markdown files. It features built-in function shortcuts that enable users to quickly and easily generate Markdown content. Additionally, the app allows users to create custom function tags, empowering them to build and design their own reusable components. At the core of the app is a custom compiler that processes these custom tags and generates the corresponding Markdown text, providing a flexible and efficient workflow for both novice and experienced Markdown users.

<h2>Features</h2>
Synergy comes prebuilt with custom syntax that compiles and renders the expected markdown, here we will go through the main shortcuts. To view the shortcut refer to the editor.
<br>ass

### `Text Styles`
```
### `Text Styles`
<bf>Bold Font</bf> 
<hl>Highlight Style</hl>
<u>Underline</u>
<s>Strike Through</s>
<it>Italics Font</it>
```
**Bold Font** 
`Highlight Style`
<u>Underline</u>
~~Strike Through~~
*Italics Font*

<br/>


```
<bf><hl>We can also combine various styles together</hl></bf>

<bf><u>To achieve any desired text styles we want</u></bf>

<bf>Well we can achieve <s>every and</s> <it><u>almost</u></it> anything we desire with <hl>Synergy</hl></bf>
```

**`We can also combine various styles together`**

**<u>To achieve any desired text styles we want</u>**

**Well we can achieve ~~every and~~ *<u>almost</u>* anything we desire with `Synergy`**

<br>



### `Text Colours`
Synergy comes prebuilt with shortcuts to change the colour of text by simply wrapping it in a colour tag, these two can be combines with other test styles. 
**Note**: `For Markdown compilers which don't support HTML, colour text will not work`. 

```
<bf>Note</bf>: `For Markdown compilers which don't support HTML, colour text will not work`. 

<red><hl>Red</hl></red> : <red><bf>Bold red</bf></red> <red><bf><hl>Bold & Highlight</hl></bf></red>  <red><bf><u>Bold & Underline</u></bf></red>  <red><it>Italics Red</it></red>

<blue><hl>Blue</hl></blue> : <blue><bf>Bold blue</bf></blue> <blue><bf><hl>Bold & Highlight</hl></bf></blue>  <blue><bf><u>Bold & Underline</u></bf></blue>  <blue><it>Italics Blue</it></blue>

<green><hl>Green</hl></green> : <green><bf>Bold green</bf></green> <green><bf><hl>Bold & Highlight</hl></bf></green>  <green><bf><u>Bold & Underline</u></bf></green>  <green><it>Italics Green</it></green>

<yellow><hl>Yellow</hl></yellow> : <yellow><bf>Bold yellow</bf></yellow> <yellow><bf><hl>Bold & Highlight</hl></bf></yellow>  <yellow><bf><u>Bold & Underline</u></bf></yellow>  <yellow><it>Italics Yellow</it></yellow>

<orange><hl>Orange</hl></orange> : <orange><bf>Bold orange</bf></orange> <orange><bf><hl>Bold & Highlight</hl></bf></orange>  <orange><bf><u>Bold & Underline</u></bf></orange>  <orange><it>Italics Orange</it></orange>

<purple><hl>Purple</hl></purple> : <purple><bf>Bold purple</bf></purple> <purple><bf><hl>Bold & Highlight</hl></bf></purple>  <purple><bf><u>Bold & Underline</u></bf></purple>  <purple><it>Italics Purple</it></purple>

```

<span style="color:red">`Red`</span> : <span style="color:red">**Bold red**</span> <span style="color:red">**`Bold & Highlight`**</span>  <span style="color:red">**<u>Bold & Underline</u>**</span>  <span style="color:red">*Italics Red*</span>

<span style="color:blue">`Blue`</span> : <span style="color:blue">**Bold blue**</span> <span style="color:blue">**`Bold & Highlight`**</span>  <span style="color:blue">**<u>Bold & Underline</u>**</span>  <span style="color:blue">*Italics Blue*</span>

<span style="color:green">`Green`</span> : <span style="color:green">**Bold green**</span> <span style="color:green">**`Bold & Highlight`**</span>  <span style="color:green">**<u>Bold & Underline</u>**</span>  <span style="color:green">*Italics Green*</span>

<span style="color:yellow">`Yellow`</span> : <span style="color:yellow">**Bold yellow**</span> <span style="color:yellow">**`Bold & Highlight`**</span>  <span style="color:yellow">**<u>Bold & Underline</u>**</span>  <span style="color:yellow">*Italics Yellow*</span>

<span style="color:orange">`Orange`</span> : <span style="color:orange">**Bold orange**</span> <span style="color:orange">**`Bold & Highlight`**</span>  <span style="color:orange">**<u>Bold & Underline</u>**</span>  <span style="color:orange">*Italics Orange*</span>

<span style="color:purple">`Purple`</span> : <span style="color:purple">**Bold purple**</span> <span style="color:purple">**`Bold & Highlight`**</span>  <span style="color:purple">**<u>Bold & Underline</u>**</span>  <span style="color:purple">*Italics Purple*</span>

<br>

### `Code Segments`
We also have the ability to easily impliment code segments within markdown, currently there is support for the following languages


`Javascript`
```
<codejs>
// Select the button and the paragraph
const toggleButton = document.getElementById('toggleButton');
const paragraph = document.getElementById('paragraph');

// Function to toggle the visibility
function toggleVisibility() {
    if (paragraph.style.display === 'none') {
        paragraph.style.display = 'block';
    } else {
        paragraph.style.display = 'none';
    }
}

// Add event listener to the button
toggleButton.addEventListener('click', toggleVisibility);
</codejs>
```

```js

// Select the button and the paragraph
const toggleButton = document.getElementById('toggleButton');
const paragraph = document.getElementById('paragraph');

// Function to toggle the visibility
function toggleVisibility() {
    if (paragraph.style.display === 'none') {
        paragraph.style.display = 'block';
    } else {
        paragraph.style.display = 'none';
    }
}

// Add event listener to the button
toggleButton.addEventListener('click', toggleVisibility);

```

<br>



`Python`
```
<codepython>
def is_prime(number):
    if number <= 1:
        return False
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True

# Example usage:
print(is_prime(17))  # Output: True
print(is_prime(18))  # Output: False
</codepython>
```

```python

def is_prime(number):
    if number <= 1:
        return False
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True

# Example usage:
print(is_prime(17))  # Output: True
print(is_prime(18))  # Output: False

```

<br>

`Code`
```
<code>
using System;

public class Program
{
    public static int Factorial(int n)
    {
        if (n <= 1)
            return 1;
        return n * Factorial(n - 1);
    }

    public static void Main()
    {
        Console.WriteLine(Factorial(5)); // Output: 120
        Console.WriteLine(Factorial(6)); // Output: 720
    }
}

</code>
```
```

using System;

public class Program
{
    public static int Factorial(int n)
    {
        if (n <= 1)
            return 1;
        return n * Factorial(n - 1);
    }

    public static void Main()
    {
        Console.WriteLine(Factorial(5)); // Output: 120
        Console.WriteLine(Factorial(6)); // Output: 720
    }
}


```

<br>

### `Lists`
Synergy has built in features to allows us to easily create lists, below is a following examples of how we can do that.

```
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item
    <ol>
      <li>Indented item</li>
      <li>Indented item</li>
    </ol>
  </li>
  <li>Fourth item</li>
</ol>
```

<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item
    <ol>
      <li>Indented item</li>
      <li>Indented item</li>
    </ol>
  </li>
  <li>Fourth item</li>
</ol>

<br>

### `Tables`

```
<table>
  <columns>Name, Age, Occupation, Description</columns>
  <row><bf><red>John Doe</red></bf>, <hl>30</hl>, Developer, <u><it>Experienced full-stack developer</it></u></row>
  <row><blue>Jane Smith</blue>, 25, Designer, <s>Creative graphic designer</s> with <hl>5 years of experience</hl></row>
  <row><green>Mike Johnson</green>, <yellow>40</yellow>, <bf>Project Manager</bf>, <u>Leading multiple successful projects</u></row>
  <row><purple>Alice Brown</purple>, 35, <orange>QA Engineer</orange>, <it>Expert in automated testing</it></row>
</table>
```

Synergy allows you to create tables easily and intuitively, below is an example of how we can combine the various features Synergy provides to create a dynamic and visually stunning table within a few lines

| Name | Age | Occupation | Description |
| --- | --- | --- | --- |
| **<span style="color:red">John Doe</span>** | `30` | Developer | <u>*Experienced full-stack developer*</u> |
| <span style="color:blue">Jane Smith</span> | 25 | Designer | ~~Creative graphic designer~~ with `5 years of experience` |
| <span style="color:green">Mike Johnson</span> | <span style="color:yellow">40</span> | **Project Manager** | <u>Leading multiple successful projects</u> |
| <span style="color:purple">Alice Brown</span> | 35 | <span style="color:orange">QA Engineer</span> | *Expert in automated testing* |
