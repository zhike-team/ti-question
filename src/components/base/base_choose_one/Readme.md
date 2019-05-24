BaseChooseOne component example:

```js
<BaseChooseOne
    params={{ mode: 'package' }}
    setStepRecord={() => {}}
    step={{
        index: 5,
        question: {
            "id": 1007162,
            "name": "测试-基础题库 Q1",
            "status": "Visible",
            "type": "ChooseOne",
            "questionTagId": null,
            "rank": 1,
            "difficulty": "Easy",
            "exampleNum": 0,
            "stem": {
                "paragraphs": [
                    {
                        "id": "7bb92128-339d-ca53-8da6-97832ebcb6cf",
                        "text": "Sam 看到",
                        "type": "Text"
                    }
                ]
            },
            "extra": null,
            "practiceId": 1002107,
            "examId": 65,
            "videoTimeRangeId": null,
            "subjectId": 293,
            "conciseId": null,
            "audition": null,
            "textbookId": 148,
            "recommendDuration": 120,
            "practiceTypeId": null,
            "createdAt": "2019-02-28T03:48:06.000Z",
            "updatedAt": "2019-02-28T03:48:06.000Z",
            "materials": [
                {
                    "id": 28237,
                    "qNum": null,
                    "rank": 1,
                    "subStem": null,
                    "image": null,
                    "audio": null,
                    "audioReference": null,
                    "reference": null,
                    "direction": {
                        "paragraphs": [
                            {
                                "id": "f44befc0-cbb8-944b-9283-cc356ca064f2",
                                "text": "你撒离开的",
                                "type": "Text"
                            }
                        ]
                    },
                    "videoTimeRangeId": null,
                    "choices": [
                        {
                            "text": {
                                "paragraphs": [
                                    {
                                        "id": "38cc6033-3a45-ecb4-0964-d77a3b314c8e",
                                        "text": "就撒看到",
                                        "type": "Text"
                                    }
                                ]
                            },
                            "option": "A"
                        },
                        {
                            "text": {
                                "paragraphs": [
                                    {
                                        "id": "3669c802-0c35-e008-0731-d9d58d2815ef",
                                        "text": "masked",
                                        "type": "Text"
                                    }
                                ]
                            },
                            "option": "B"
                        },
                        {
                            "text": {
                                "paragraphs": [
                                    {
                                        "id": "14acaa6a-ff36-ebc5-41c2-9dc6c4ca58a0",
                                        "text": "阿是激动离开",
                                        "type": "Text"
                                    }
                                ]
                            },
                            "option": "C"
                        }
                    ],
                    "insertSentence": null,
                    "positionTip": null,
                    "answer": [
                        0
                    ],
                    "analysis": {
                        "paragraphs": [
                            {
                                "id": "0fc74ae3-ac9c-a2c4-5762-7e5ac87c7b2b",
                                "text": "三等奖看了",
                                "type": "Text"
                            }
                        ]
                    },
                    "examples": null,
                    "questionId": 1007162,
                    "origin": {
                        "paragraphs": [
                            {
                                "id": "9a1a64e1-0945-d1aa-68dd-0542be833602",
                                "text": "俺是激动哭了",
                                "type": "Text"
                            }
                        ]
                    },
                    "score": null,
                    "labels": null
                }
            ]
        },
        questionCount: 8,
        questionId: 1007162,
        questionIndex: 4,
        subject: "Base",
        type: "ChooseOne",
    }}
    stepRecord={{}}
    question={{
        "id": 1007162,
        "name": "测试-基础题库 Q1",
        "status": "Visible",
        "type": "ChooseOne",
        "questionTagId": null,
        "rank": 1,
        "difficulty": "Easy",
        "exampleNum": 0,
        "stem": {
            "paragraphs": [
                {
                    "id": "7bb92128-339d-ca53-8da6-97832ebcb6cf",
                    "text": "Sam 看到",
                    "type": "Text"
                }
            ]
        },
        "extra": null,
        "practiceId": 1002107,
        "examId": 65,
        "videoTimeRangeId": null,
        "subjectId": 293,
        "conciseId": null,
        "audition": null,
        "textbookId": 148,
        "recommendDuration": 120,
        "practiceTypeId": null,
        "createdAt": "2019-02-28T03:48:06.000Z",
        "updatedAt": "2019-02-28T03:48:06.000Z",
        "materials": [
            {
                "id": 28237,
                "qNum": null,
                "rank": 1,
                "subStem": null,
                "image": null,
                "audio": null,
                "audioReference": null,
                "reference": null,
                "direction": {
                    "paragraphs": [
                        {
                            "id": "f44befc0-cbb8-944b-9283-cc356ca064f2",
                            "text": "你撒离开的",
                            "type": "Text"
                        }
                    ]
                },
                "videoTimeRangeId": null,
                "choices": [
                    {
                        "text": {
                            "paragraphs": [
                                {
                                    "id": "38cc6033-3a45-ecb4-0964-d77a3b314c8e",
                                    "text": "就撒看到",
                                    "type": "Text"
                                }
                            ]
                        },
                        "option": "A"
                    },
                    {
                        "text": {
                            "paragraphs": [
                                {
                                    "id": "3669c802-0c35-e008-0731-d9d58d2815ef",
                                    "text": "masked",
                                    "type": "Text"
                                }
                            ]
                        },
                        "option": "B"
                    },
                    {
                        "text": {
                            "paragraphs": [
                                {
                                    "id": "14acaa6a-ff36-ebc5-41c2-9dc6c4ca58a0",
                                    "text": "阿是激动离开",
                                    "type": "Text"
                                }
                            ]
                        },
                        "option": "C"
                    }
                ],
                "insertSentence": null,
                "positionTip": null,
                "answer": [
                    0
                ],
                "analysis": {
                    "paragraphs": [
                        {
                            "id": "0fc74ae3-ac9c-a2c4-5762-7e5ac87c7b2b",
                            "text": "三等奖看了",
                            "type": "Text"
                        }
                    ]
                },
                "examples": null,
                "questionId": 1007162,
                "origin": {
                    "paragraphs": [
                        {
                            "id": "9a1a64e1-0945-d1aa-68dd-0542be833602",
                            "text": "俺是激动哭了",
                            "type": "Text"
                        }
                    ]
                },
                "score": null,
                "labels": null
            }
        ]
    }}
    isReport={false}
    >jsjjs</BaseChooseOne>
```