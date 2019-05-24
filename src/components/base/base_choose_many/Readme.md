BaseChooseMany component example:

```js
<BaseChooseMany
    params={{ mode: 'package' }} 
    setStepRecord={() => {}}
    step={ {
        index: 5,
        questionCount: 8,
        questionId: 1007162,
        questionIndex: 5,
        subject: "Base",
        type: "ChooseMany",
        question: {
            "id": 1007163,
            "name": "测试-基础题库 Q2",
            "status": "Visible",
            "type": "ChooseMany",
            "questionTagId": null,
            "rank": 2,
            "difficulty": "Hard",
            "exampleNum": 0,
            "stem": {
                "paragraphs": [
                    {
                        "id": "012012d0-6006-9ea8-c70d-1f2d084ff306",
                        "text": "撒到你家看了吗；1",
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
                    "id": 28235,
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
                                "id": "4a3c9eae-d77e-bd27-2c44-37e60ac0f8cd",
                                "text": "俺圣诞快乐",
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
                                        "id": "fbb7487b-8242-afe7-7289-212531c70c3e",
                                        "text": "三节快到了",
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
                                        "id": "542c13a0-5661-88ed-93dc-af866a51ae6c",
                                        "text": "撒比的艰苦努力吗；1",
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
                                        "id": "54889fa4-822a-065c-c398-a1f9b4189bf7",
                                        "text": "阿是艰苦的努力；1",
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
                                "id": "3f54c2ec-0404-69ec-eea4-130ba9134259",
                                "text": "阿斯顿课就努力吗；1",
                                "type": "Text"
                            }
                        ]
                    },
                    "examples": null,
                    "questionId": 1007163,
                    "origin": {
                        "paragraphs": [
                            {
                                "id": "b42c3b31-d51b-fd06-e605-bd356fdf3254",
                                "text": "撒到哪里看",
                                "type": "Text"
                            }
                        ]
                    },
                    "score": null,
                    "labels": null
                }
            ]
        },
    }}
    stepRecord={{}}
    question={ {
        "id": 1007163,
        "name": "测试-基础题库 Q2",
        "status": "Visible",
        "type": "ChooseMany",
        "questionTagId": null,
        "rank": 2,
        "difficulty": "Hard",
        "exampleNum": 0,
        "stem": {
            "paragraphs": [
                {
                    "id": "012012d0-6006-9ea8-c70d-1f2d084ff306",
                    "text": "撒到你家看了吗；1",
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
                "id": 28235,
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
                            "id": "4a3c9eae-d77e-bd27-2c44-37e60ac0f8cd",
                            "text": "俺圣诞快乐",
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
                                    "id": "fbb7487b-8242-afe7-7289-212531c70c3e",
                                    "text": "三节快到了",
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
                                    "id": "542c13a0-5661-88ed-93dc-af866a51ae6c",
                                    "text": "撒比的艰苦努力吗；1",
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
                                    "id": "54889fa4-822a-065c-c398-a1f9b4189bf7",
                                    "text": "阿是艰苦的努力；1",
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
                            "id": "3f54c2ec-0404-69ec-eea4-130ba9134259",
                            "text": "阿斯顿课就努力吗；1",
                            "type": "Text"
                        }
                    ]
                },
                "examples": null,
                "questionId": 1007163,
                "origin": {
                    "paragraphs": [
                        {
                            "id": "b42c3b31-d51b-fd06-e605-bd356fdf3254",
                            "text": "撒到哪里看",
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
    >jsjjs</BaseChooseMany>
```