const links_data = {
  nodes: [
    {
      id: "id1",
      name: "Basics",
      val: 1,
      description:
        "Fundamental programming concepts that form the foundation of coding.\nIncludes variables, data types, and basic syntax structures.\nEssential knowledge for any programmer.",
    },
    {
      id: "id2",
      name: "Numbers",
      val: 1,
      description:
        "Numeric data types including integers and floating points.\nHandles mathematical operations and numeric representation.\nFoundational for calculations and algorithms.",
    },
    {
      id: "id3",
      name: "Arithmetic Operators",
      val: 1,
      description:
        "Mathematical operations like addition, subtraction, multiplication and division.\nIncludes modulus and exponentiation operations.\nEssential for computational logic in programs.",
    },
    {
      id: "id4",
      name: "Strings",
      val: 1,
      description:
        "Text data manipulation and operations for character sequences.\nIncludes concatenation, substrings, and character access.\nFundamental for handling textual information.",
    },
    {
      id: "id5",
      name: "Booleans",
      val: 1,
      description:
        "True/false logical values used for making decisions.\nForms the basis of conditional logic and comparisons.\nEssential for control flow in programs.",
    },
    {
      id: "id6",
      name: "Arrays",
      val: 1,
      description:
        "Ordered collections of items stored in a single variable.\nAllows storage and manipulation of multiple values.\nFundamental data structure for organizing information.",
    },
    {
      id: "id7",
      name: "Conditionals",
      val: 1,
      description:
        "Decision-making structures that execute different code based on conditions.\nIncludes if, else if, and else statements.\nAllows programs to respond to different situations.",
    },
    {
      id: "id8",
      name: "Comparison",
      val: 1,
      description:
        "Operators that evaluate relationships between values.\nIncludes equality, inequality, and relational operators.\nForms the basis for conditional logic and sorting.",
    },
    {
      id: "id9",
      name: "Increment/Decrement",
      val: 1,
      description:
        "Operators (++ and --) that add or subtract one from a value.\nCommonly used in loops and counters.\nProvides shorthand for common mathematical operations.",
    },
    {
      id: "id10",
      name: "For Loops",
      val: 1,
      description:
        "Control structures that repeat code blocks a specific number of times.\nUses counters to track iterations and control flow.\nEssential for batch processing and iteration.",
    },
    {
      id: "id11",
      name: "While Loops",
      val: 1,
      description:
        "Loops that continue execution as long as a condition remains true.\nUseful for situations with unknown iteration counts.\nProvides flexible iteration based on dynamic conditions.",
    },
    {
      id: "id12",
      name: "Switch Statement",
      val: 1,
      description:
        "Multi-branch decision structure for selecting one of many code blocks.\nMore efficient than multiple if-else statements for certain scenarios.\nExcellent for menu systems and state machines.",
    },
    {
      id: "id13",
      name: "Objects",
      val: 1,
      description:
        "Key-value data structures containing properties and methods.\nFundamental for representing complex entities and relationships.\nBuilding blocks of object-oriented programming.",
    },
    {
      id: "id14",
      name: "Null and Undefined",
      val: 1,
      description:
        "Special values representing absence of data or uninitialized variables.\nDifferent semantic meanings help distinguish intent.\nCritical for error handling and data validation.",
    },
    {
      id: "id15",
      name: "Type Conversion",
      val: 1,
      description:
        "Process of changing a value from one data type to another.\nIncludes implicit coercion and explicit casting.\nEssential for data processing and validation.",
    },
    {
      id: "id16",
      name: "Functions",
      val: 1,
      description:
        "Reusable code blocks that perform specific tasks.\nAccepts parameters and can return values.\nCritical for code organization, reusability, and abstraction.",
    },
    {
      id: "id17",
      name: "Template Strings",
      val: 1,
      description:
        "Enhanced strings with embedded expressions using `${}` syntax.\nAllows multiline strings and dynamic content insertion.\nImproves readability and maintainability of string operations.",
    },
    {
      id: "id18",
      name: "Ternary Operator",
      val: 1,
      description:
        "Condensed if/else expression using ? and : symbols.\nReturns values based on a condition evaluation.\nProvides concise syntax for simple conditional assignments.",
    },
    {
      id: "id19",
      name: "Closures",
      val: 1,
      description:
        "Functions that retain access to their lexical scope when executed elsewhere.\nEnables data encapsulation and private variable creation.\nFoundational for advanced patterns like modules and callbacks.",
    },
    {
      id: "id20",
      name: "Callbacks",
      val: 1,
      description:
        "Functions passed as arguments to other functions for later execution.\nEnables asynchronous programming and event handling.\nFundamental for handling operations that complete in the future.",
    },
    {
      id: "id21",
      name: "Array Destructuring",
      val: 1,
      description:
        "Syntax for unpacking array values into distinct variables.\nAllows concise extraction of multiple values simultaneously.\nImproves code readability and reduces intermediate variables.",
    },
    {
      id: "id22",
      name: "Rest and Spread",
      val: 1,
      description:
        "Operators using ... syntax for handling variable numbers of items.\nRest collects multiple elements into an array parameter.\nSpread expands arrays or objects into individual elements.",
    },
    {
      id: "id23",
      name: "Array Analysis",
      val: 1,
      description:
        "Methods for examining array content like find, some, and every.\nTests array elements against conditions or searches for specific values.\nProvides declarative alternatives to manual iteration.",
    },
    {
      id: "id24",
      name: "Arrow Functions",
      val: 1,
      description:
        "Concise syntax for creating functions using => notation.\nOffers lexical 'this' binding unlike traditional functions.\nImproves readability with implicit returns for expressions.",
    },
    {
      id: "id25",
      name: "Prototypes & Classes",
      val: 1,
      description:
        "Object-oriented patterns for creating reusable object templates.\nPrototypes define shared behavior and inheritance chains.\nClasses provide syntactic sugar over prototype-based inheritance.",
    },
    {
      id: "id26",
      name: "Errors",
      val: 1,
      description:
        "Mechanisms for handling exceptional conditions in code.\nIncludes try/catch blocks and error objects.\nFundamental for creating robust, fault-tolerant applications.",
    },
    {
      id: "id27",
      name: "Inheritance",
      val: 1,
      description:
        "Object-oriented pattern where classes extend other classes.\nEnables code reuse and hierarchical organization of behaviors.\nSupports polymorphism through method overriding.",
    },
    {
      id: "id28",
      name: "Array Transformations",
      val: 1,
      description:
        "Functional methods that process array data like map, filter, and reduce.\nCreates new arrays or values based on existing array content.\nEnables declarative, chainable data processing operations.",
    },
    {
      id: "id29",
      name: "Regular Expressions",
      val: 1,
      description:
        "Pattern matching syntax for complex text processing.\nEnables powerful search, validation, and replacement operations.\nEssential for data validation and text manipulation.",
    },
    {
      id: "id30",
      name: "Array Loops",
      val: 1,
      description:
        "Specialized methods for array iteration like forEach and for...of.\nProvides alternatives to traditional counting loops.\nOffers clearer semantics for specific iteration use cases.",
    },
    {
      id: "id31",
      name: "Sets",
      val: 1,
      description:
        "Collections that store unique values with no duplicates.\nProvides operations for union, intersection, and difference.\nUseful for eliminating duplicates and membership testing.",
    },
    {
      id: "id32",
      name: "Promises",
      val: 1,
      description:
        "Objects representing completion or failure of asynchronous operations.\nProvides a cleaner alternative to callback patterns.\nSupports chaining, error handling, and composition.",
    },
    {
      id: "id33",
      name: "Recursion",
      val: 1,
      description:
        "Programming technique where functions call themselves.\nSolves problems through self-similar subproblems.\nUseful for tree traversal, fractals, and divide-and-conquer algorithms.",
    },
  ],
  links: [
    { source: "id1", target: "id2" },
    { source: "id1", target: "id3" },
    { source: "id1", target: "id4" },
    { source: "id1", target: "id5" },
    { source: "id2", target: "id9" },
    { source: "id3", target: "id7" },
    { source: "id4", target: "id7" },
    { source: "id5", target: "id7" },
    { source: "id6", target: "id10" },
    { source: "id7", target: "id8" },
    { source: "id7", target: "id10" },
    { source: "id7", target: "id11" },
    { source: "id7", target: "id12" },
    { source: "id10", target: "id13" },
    { source: "id11", target: "id13" },
    { source: "id13", target: "id14" },
    { source: "id14", target: "id15" },
    { source: "id14", target: "id16" },
    { source: "id15", target: "id17" },
    { source: "id15", target: "id18" },
    { source: "id16", target: "id19" },
    { source: "id16", target: "id20" },
    { source: "id19", target: "id22" },
    { source: "id20", target: "id22" },
    { source: "id22", target: "id25" },
    { source: "id17", target: "id21" },
    { source: "id18", target: "id21" },
    { source: "id21", target: "id23" },
    { source: "id21", target: "id24" },
    { source: "id24", target: "id28" },
    { source: "id25", target: "id28" },
    { source: "id28", target: "id30" },
    { source: "id26", target: "id30" },
    { source: "id27", target: "id30" },
    { source: "id30", target: "id32" },
    { source: "id30", target: "id33" },
    { source: "id23", target: "id31" },
  ],
};

export default links_data;
