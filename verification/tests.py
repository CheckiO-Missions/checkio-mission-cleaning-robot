"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from decimal import Decimal

TESTS = {
    "Basics": [
        {
            "input": [1, "E", "A", "C"],
            "answer": 0.00000000,
        },
        {
            "input": [1, "E", "B", "C"],
            "answer": 0.25000000,
        },
        {
            "input": [2, "E", "A", "B"],
            "answer": 0.06250000,
        },
    ],
    "Extra": [
        {
            "input": [3, "E", "A", "B"],
            "answer": 0.078125,
        },
        {
            "input": [2, "E", "A", "I"],
            "answer": 0.125,
        },
        {
            "input": [4, "A", "I", "E"],
            "answer": 0.0078125,
        },
        
    ]
}
