# Thoughts about the project and some reflection

This is not a part of the project documentation, this is just for me to reflect on the project and what I have learned. I am just putting it in the documentation for anyone interested.

## What went well?

- Git usage. In this project, I have used git a lot better compared to the [project](https://github.com/tvaskisalo/Solita-Dev-Academy-2022) I did last year. Just by comparing the amount of commits (last year 18 vs this year 75+), I can see that in this project the commits have been more finely grained, which is better for version control. Also the git messages are more descriptive since each commit has less changes.

- Documentation. Last year the README.md was kind of a mess and the whole diary thing had very little information and a lot of text. This year the documentation is way more dense while being so much easier to read. I do believe that I still have a lot to learn on how to write good and efficient documentation, but this is still improvement.

- Testing. Last year my focus was not in testing, which in hindsight sounds very dumb. This year I took testing seriously, which we can clearly see in the total amount of tests. Last year in total there were 42 tests and this year a total of 201 tests. On top of that last year I implemented token-based user authentication and the statistics were much more complex, so last year I should have done A LOT more tests. Because of the amount of good tests, I managed to track down a lot of bugs early on. That made the whole project way more fun to work with.

- Containerization. Implementing containerization was a really good idea. Having a reproducible and consistent environment to develop with made the whole process so much smoother. Especially moving the mongodb from the online service to a local container helped to reduce the time that it takes to execute backend tests. It also made them more consistent, since no more random timeouts. End to end testing is now easier to run as well, since the environment for cypress can be initialized with only one command. Still I have a lot to learn about containerization and I had some issues with ports and environment variables while developing. Also not having to configure or send and .env file for running the project is super handy. Of course in a real production environment you would have an .env file and not expose the mongodb username and password.

- Overall workflow. I felt a lot more confident on what and how to code the project. I had to do a lot less of trial and error to find solutions. I used roughly the same amount of time last year as I did this year, but I ended up with a way better solution. I am really happy to see that I have improved as a developer even though I have a lot to learn. I am also happy that I improved on many mistakes I did last year. 

## What did not go that smoothly?

- UI. I am not that good with UI yet. It is definitely one of my weakest skills in full stack development. I have probelms figuring out how the styling works and what to use in different situations. But I am getting there.

- Documentation. Yes, it went pretty well, especially when comparing to last year, but it still takes me a lot of time to write good documentation files. The formatting, ordering and what to write and how is a bit rough for me. Also understanding what is obvious from the code and what should be added as a comment is something I want to improve on. I do think that my code is pretty well self-documenting, but I do have to pay more attention to commenting.

- Error-handling Middleware. I am not that happy with the middleware usage in both frontend and backend. A centralized error-handling is something that I wanted to do, but did not have time to do, especially when it is not in my comfort-zone. I can write error-handling middleware but I did not do it for this project.

## Conclusion

Overall I am happy with the project. I learned a lot and managed to improve on many mistakes I have made in the past. I am more confident on my solution compared to last year. While I have a lot to learn still, I am really excited about it. I look forward to new projects and challenges that I will face, regardless if I get the job or not. In the future, I want to use different libraries and frameworks as well.


