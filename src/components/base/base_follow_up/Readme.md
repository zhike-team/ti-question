BaseFollowUp component example:

```js
<BaseFollowUp
    params={{ mode: 'package' }}
    getUploadSignature={() => {}}
    createPromise={() => {}}
    cdnUrl={'https://hq-static.smartstudy.com'}
    setRecord={() => {}}
    setStepRecord={() => {}}
    setStepRecord={() => {}}
    step={{
        index: 5,
        questionCount: 8,
        questionId: 1006501,
        questionIndex: 5,
        subject: "Base",
        type: "FollowUp",
        practice:         {
            "id": 1001622,
            "name": "跟读题",
            "shortName": null,
            "status": "Visible",
            "examId": 65,
            "subjectId": 293,
            "conciseId": null,
            "textbookId": 145,
            "topicId": null,
            "canIntensiveListening": false,
            "canFollowUp": null,
            "difficulty": null,
            "dimension": null,
            "audition": null,
            "practiceTypeId": null,
            "recommendDuration": 360,
            "createdAt": "2018-11-26T07:17:27.000Z",
            "updatedAt": "2018-11-26T07:17:27.000Z",
            "material": null,
            questions: [{
                "id": 1006501,
                "name": "跟读题 Q2",
                "status": "Visible",
                "type": "FollowUp",
                "questionTagId": null,
                "rank": 2,
                "difficulty": null,
                "exampleNum": 0,
                "stem": null,
                "extra": null,
                "practiceId": 1001622,
                "examId": 65,
                "videoTimeRangeId": null,
                "subjectId": 293,
                "conciseId": null,
                "audition": null,
                "textbookId": 145,
                "recommendDuration": 120,
                "practiceTypeId": null,
                "createdAt": "2018-12-04T06:42:10.000Z",
                "updatedAt": "2018-12-04T06:42:10.000Z",
                "materials": [
                    {
                        "id": 26407,
                        "qNum": null,
                        "rank": 1,
                        "subStem": null,
                        "image": null,
                        "audio": {
                            "src": "atheneBackend/xa4dfzti6hs.mp3"
                        },
                        "audioReference": null,
                        "reference": null,
                        "direction": {
                            "paragraphs": [
                                {
                                    "id": "3b3f4fb7-a796-c958-e7df-88b9e9294646",
                                    "text": "跟读题型2",
                                    "type": "Text"
                                }
                            ]
                        },
                        "videoTimeRangeId": null,
                        "choices": null,
                        "insertSentence": null,
                        "positionTip": null,
                        "answer": null,
                        "analysis": null,
                        "examples": null,
                        "questionId": 1006501,
                        "origin": {
                            "status": "Visible",
                            "paragraphs": [
                                {
                                    "id": "25f7ceb6-4c31-454d-173d-3d18138aa31c",
                                    "text": "{{time}}8.74/23.11{{end}}\n{{raw}}Until about 30 years ago, we thought the rings were composed of particles of ice and rock that were left over from Saturn's formation, extra material that never managed to form er...er coalesce into a moon.{{end}}\n{{translation}}直到30年前，我们认为这些环是土星形成后剩下的冰和岩石的颗粒组成的，这些剩余材料没能联合成一个卫星。{{end}}",
                                    "type": "Text"
                                }
                            ]
                        },
                        "score": null,
                        "labels": null
                    }
                ]
            }],
        },
        question: {
            "id": 1006501,
            "name": "跟读题 Q2",
            "status": "Visible",
            "type": "FollowUp",
            "questionTagId": null,
            "rank": 2,
            "difficulty": null,
            "exampleNum": 0,
            "stem": null,
            "extra": null,
            "practiceId": 1001622,
            "examId": 65,
            "videoTimeRangeId": null,
            "subjectId": 293,
            "conciseId": null,
            "audition": null,
            "textbookId": 145,
            "recommendDuration": 120,
            "practiceTypeId": null,
            "createdAt": "2018-12-04T06:42:10.000Z",
            "updatedAt": "2018-12-04T06:42:10.000Z",
            "materials": [
                {
                    "id": 26407,
                    "qNum": null,
                    "rank": 1,
                    "subStem": null,
                    "image": null,
                    "audio": {
                        "src": "atheneBackend/xa4dfzti6hs.mp3"
                    },
                    "audioReference": null,
                    "reference": null,
                    "direction": {
                        "paragraphs": [
                            {
                                "id": "3b3f4fb7-a796-c958-e7df-88b9e9294646",
                                "text": "跟读题型2",
                                "type": "Text"
                            }
                        ]
                    },
                    "videoTimeRangeId": null,
                    "choices": null,
                    "insertSentence": null,
                    "positionTip": null,
                    "answer": null,
                    "analysis": null,
                    "examples": null,
                    "questionId": 1006501,
                    "origin": {
                        "status": "Visible",
                        "paragraphs": [
                            {
                                "id": "25f7ceb6-4c31-454d-173d-3d18138aa31c",
                                "text": "{{time}}8.74/23.11{{end}}\n{{raw}}Until about 30 years ago, we thought the rings were composed of particles of ice and rock that were left over from Saturn's formation, extra material that never managed to form er...er coalesce into a moon.{{end}}\n{{translation}}直到30年前，我们认为这些环是土星形成后剩下的冰和岩石的颗粒组成的，这些剩余材料没能联合成一个卫星。{{end}}",
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
    question={{
        "id": 1006501,
        "name": "跟读题 Q2",
        "status": "Visible",
        "type": "FollowUp",
        "questionTagId": null,
        "rank": 2,
        "difficulty": null,
        "exampleNum": 0,
        "stem": null,
        "extra": null,
        "practiceId": 1001622,
        "examId": 65,
        "videoTimeRangeId": null,
        "subjectId": 293,
        "conciseId": null,
        "audition": null,
        "textbookId": 145,
        "recommendDuration": 120,
        "practiceTypeId": null,
        "createdAt": "2018-12-04T06:42:10.000Z",
        "updatedAt": "2018-12-04T06:42:10.000Z",
        "materials": [
            {
                "id": 26407,
                "qNum": null,
                "rank": 1,
                "subStem": null,
                "image": null,
                "audio": {
                    "src": "atheneBackend/xa4dfzti6hs.mp3"
                },
                "audioReference": null,
                "reference": null,
                "direction": {
                    "paragraphs": [
                        {
                            "id": "3b3f4fb7-a796-c958-e7df-88b9e9294646",
                            "text": "跟读题型2",
                            "type": "Text"
                        }
                    ]
                },
                "videoTimeRangeId": null,
                "choices": null,
                "insertSentence": null,
                "positionTip": null,
                "answer": null,
                "analysis": null,
                "examples": null,
                "questionId": 1006501,
                "origin": {
                    "status": "Visible",
                    "paragraphs": [
                        {
                            "id": "25f7ceb6-4c31-454d-173d-3d18138aa31c",
                            "text": "{{time}}8.74/23.11{{end}}\n{{raw}}Until about 30 years ago, we thought the rings were composed of particles of ice and rock that were left over from Saturn's formation, extra material that never managed to form er...er coalesce into a moon.{{end}}\n{{translation}}直到30年前，我们认为这些环是土星形成后剩下的冰和岩石的颗粒组成的，这些剩余材料没能联合成一个卫星。{{end}}",
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
    >jsjjs</BaseFollowUp>
```