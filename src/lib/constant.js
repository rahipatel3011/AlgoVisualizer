export const START_NODE_COOR = {
  row: 3,
  col: 15,
};

export const FINISH_NODE_COOR = {
  row: 9,
  col: 25,
};

export const MAZE_PROMPT = `
Generate a maze in JSON format with the following specifications:


2. Return the maze as a JSON object with a single key 'grid' whose value is an array of 20 arrays, each containing 50 integers.
3. Use the following integer values to represent different cell types:
   - 1: Wall
   - 2: Start node (must be present)
   - 3: Finish node (must be present)
   - 0: Path or empty space

4. first and last rows, first and last columns must be walls (1).
5. make random one cell each with value 2 and 3. remaining with wall and path.


Important:
- The start node (2) and finish node (3) MUST be present in the maze.
- There MUST be a continuous path of 0s connecting the start and finish nodes.
- Include multiple dead ends and false paths to increase difficulty.

The output should be a valid JSON object with the 'grid' key containing the maze representation. Double-check that the start node, finish node, and a connecting path are all present in the final maze.
`;
