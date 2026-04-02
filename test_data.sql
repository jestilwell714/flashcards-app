-- Wipe --
DELETE FROM public.flashcard_tags WHERE flashcard_id IN (SELECT id FROM public.flashcards WHERE deck_id IN (SELECT id FROM public.decks WHERE user_id = 5));
DELETE FROM public.flashcards WHERE deck_id IN (SELECT id FROM public.decks WHERE user_id = 5);
DELETE FROM public.decks WHERE user_id = 5;
DELETE FROM public.tags WHERE user_id = 5;
DELETE FROM public.folders WHERE user_id = 5 AND parent_folder_id IS NOT NULL;
DELETE FROM public.folders WHERE user_id = 5;
DELETE FROM public.users WHERE id = 5;

-- Insert --
INSERT INTO public.users
(id, first_name, last_name, "password", username)
VALUES(5, 'Test', 'Test', '$2a$10$yYxBeM96D210aVFqKhfVe.i.JhTtLSO.Vme5zG5FyhdIO/n.QvIVm', 'test123');

INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(23, NULL, 5, 'COMP360');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(24, NULL, 5, 'COMP204');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(25, NULL, 5, 'COMP404');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(26, NULL, 5, 'LAWS101');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(27, NULL, 5, 'MART101');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(28, 23, 5, 'Operating Systems');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(29, 23, 5, 'Computer Architecture ');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(30, 29, 5, 'Test 1');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(31, 26, 5, 'Semester one');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(32, 26, 5, 'Semester two');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(33, 24, 5, 'Data Structures');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(34, 24, 5, 'Algorithms');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(36, 25, 5, 'The Internet');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(37, 25, 5, 'Databases');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(38, 37, 5, 'NoSQL');
INSERT INTO public.folders
(id, parent_folder_id, user_id, "name")
VALUES(39, 36, 5, 'HTTP');

INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(27, 19, 5, 'Lecture 1');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(29, 20, 5, 'Lecture 1');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(29, 21, 5, 'Lecture 2');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(29, 22, 5, 'Lecture 3');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(28, 24, 5, 'Lecture 7');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(28, 25, 5, 'Lecture 8');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(28, 26, 5, 'Lecture 9');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(31, 27, 5, 'Week one');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(31, 29, 5, 'Week two');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(32, 30, 5, 'Week one');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(27, 31, 5, 'Lecture 2');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(27, 32, 5, 'Exam');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(33, 33, 5, 'Week one');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(33, 34, 5, 'Week Two');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(34, 35, 5, 'Week 4');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(36, 36, 5, 'TCP');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(36, 37, 5, 'IP');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(36, 38, 5, 'UDP');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(37, 39, 5, 'PostgreSQL');
INSERT INTO public.decks
(folder_id, id, user_id, "name")
VALUES(25, 40, 5, 'Security');

INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 20, 35, 'LDR (Load Register) moves data from memory into a register. STR (Store Register) moves data from a register out to memory.', 'In ARM assembly, what is the difference between the LDR and STR instructions?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 20, 36, '1. Fetch, 2. Decode, 3. Execute, 4. Memory, 5. Write-back.', 'What are the five standard stages of a classic RISC instruction pipeline?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 20, 37, 'It acts as the Program Counter (PC), holding the memory address of the next instruction to be fetched.', 'In the ARM architecture, what specific function does the R15 register serve?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 20, 38, 'Registers R0 through R3.', 'According to the standard ARM calling convention (AAPCS), which registers are used to pass the first four arguments to a function?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 21, 39, 'They check the condition flags (Zero, Carry, Negative, Overflow) stored in the CPSR (Current Program Status Register), which are updated by previous ALU operations.', 'How do conditional branch instructions (like BEQ or BNE) know whether to branch or not in ARM?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 21, 40, 'When an instruction requires the result of a previous instruction that is still moving through the pipeline and hasn''t been written back to the register file yet.', 'What is a "Data Hazard" in a pipelined CPU datapath?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 21, 41, 'Data Forwarding (or Bypassing). It routes the output from the ALU directly back to the input of the ALU for the next instruction.', 'What hardware technique is built into the datapath to resolve Data Hazards without stalling the pipeline?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 24, 42, 'ls', 'What command is used to list the files and folders in your current directory?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 24, 43, 'Print Working Directory. It outputs the absolute path of the folder you are currently in.', 'What does the pwd command do?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 24, 44, 'cd (Change Directory', 'What command do you use to navigate into a different folder?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 25, 45, 'It stands for "Superuser DO". It allows you to execute a command with administrative (root) privileges.', 'What does the sudo command do?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 25, 46, 'A single forward slash: /', 'What is the "root" directory in the Linux file system represented by?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 25, 47, 'The distribution is the underlying OS and package manager, while the Desktop Environment is just the graphical user interface (GUI) layered on top.', 'What is the difference between a Linux Distribution (like Fedora or Ubuntu) and a Desktop Environment (like GNOME or KDE Plasma)?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 25, 48, 'grep', 'What command is used to search for a specific word or string of text inside a file?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 33, 20, 'Arrays use contiguous blocks of memory. Linked Lists use non-contiguous memory connected by pointers.', 'What is the main memory difference between an Array and a Linked List?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 33, 21, 'LIFO (Last In, First Out). Example: The "Undo" button or browser history.', 'What principle does a Stack follow, and what is a real-world example?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 33, 22, 'FIFO (First In, First Out). Example: A printer job queue or line at a coffee s', 'What principle does a Queue follow, and what is a real-world example?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 33, 23, 'O(1) constant time (assuming a good hash function and minimal collisions).', 'What is the average-case time complexity for searching, inserting, and deleting in a Hash Table?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 24, 'O(n). This happens when there are severe hash collisions and all elements end up in the same bucket/linked list.', 'What is the worst-case time complexity for searching a Hash Table, and why?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 25, 'For any node, all left descendants are strictly less than the node, and all right descendants are strictly greater.', 'What is the defining rule of a Binary Search Tree (BST)?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 27, 'Vertices (nodes) are the fundamental units or data points. Edges are the lines or links that connect two vertices togethe', 'In graph terminology, what are "Vertices" and "Edges"?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 28, 'In a Directed graph, edges have a specific direction (one-way street). In an Undirected graph, edges represent a two-way connection.', 'What is the difference between a Directed and Undirected graph?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 29, 'A Directed Acyclic Graph. It is a directed graph that has no cycles (you can never start at a node and follow a path back to that same node).', 'What is a DAG?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 34, 30, 'A Queue (FIFO). It explores the graph layer-by-layer, looking at all immediate neighbors first.', 'Breadth-First Search (BFS) uses which underlying data structure?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(200.0, 34, 31, 'A Stack (LIFO) or recursion. It dives as deeply as possible down one branch before backtracking', 'Depth-First Search (DFS) uses which underlying data structure?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(150.0, 34, 26, 'A tree is a specialized type of graph that is connected and acyclic (has no cycles/loops). A graph can have cycles and disconnected nodes.', 'What is the difference between a Tree and a Graph?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 35, 32, 'Overlapping Subproblems (solving the same smaller problems repeatedly) and Optimal Substructure (the optimal solution can be constructed from optimal solutions of its subp', 'What two key properties must a problem have to be solved using Dynamic Programming?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 35, 33, 'Memoization is Top-Down (recursive, caching results as you go). Tabulation is Bottom-Up (iterative, filling a table from the smallest subproblem up to the final answer).', 'What is the difference between "Memoization" and "Tabulation" in DP?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 35, 34, 'Naive recursion is O(2^n) (exponential). DP (either memoized or tabulated) reduces it to O(n) (linear).', 'What is the time complexity of a naive recursive Fibonacci sequence vs. a DP-optimized one?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 36, 51, 'Transmission control protocol', 'What does TCP stand for?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 36, 52, 'Connection-oriented. It establishes a dedicated logical connection before sending any data.', 'Is TCP considered connection-oriented or connectionless?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 36, 53, '1. SYN (Client requests connection) 
2. SYN-ACK (Server acknowledges and requests its own connection) 
3. ACK (Client acknowledges the server).', 'What are the three steps of the TCP "Three-Way Handshake"?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 36, 54, 'TCP guarantees delivery, ordering, and error-checking (slower, reliable). UDP just fires packets at the destination without checking if they arrived (faster, unreliable).', 'What is the primary difference between TCP and UDP?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 37, 49, 'Internet Protocol', 'What does IP stand for?');
INSERT INTO public.flashcards
(weight, deck_id, id, answer, question)
VALUES(100.0, 37, 50, 'IPv4 (older, widely used) and IPv6 (newer, designed to solve address exhaustion).', 'What are the two main versions of IP addresses in use today?');

INSERT INTO public.tags
(id, user_id, "name")
VALUES(6, 5, 'Graph');
INSERT INTO public.tags
(id, user_id, "name")
VALUES(7, 5, 'Linux');
INSERT INTO public.tags
(id, user_id, "name")
VALUES(8, 5, 'Property');
INSERT INTO public.tags
(id, user_id, "name")
VALUES(9, 5, 'Criminal');
INSERT INTO public.tags
(id, user_id, "name")
VALUES(10, 5, 'Dynamic Programming');
INSERT INTO public.tags
(id, user_id, "name")
VALUES(11, 5, 'ARM Assembly');

INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(25, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(26, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(27, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(28, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(29, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(30, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(31, 6);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(33, 10);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(32, 10);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(34, 10);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(36, 11);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(37, 11);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(38, 11);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(39, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(40, 11);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(41, 11);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(42, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(43, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(44, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(45, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(46, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(47, 7);
INSERT INTO public.flashcard_tags
(flashcard_id, tag_id)
VALUES(48, 7);