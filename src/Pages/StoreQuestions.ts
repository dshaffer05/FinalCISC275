/*let detailedQuestions: string[] = [];
let detailedAnswers: number[] = [];
let answeredQuestions: string[] = [];

export let StoreQuestions = {
  getDetailed: () => detailedQuestions,
  setDetailed: (q: string[]) => {
    detailedQuestions = q.map((question: string)=> question);
  },
  getDetailedAnswers: () => detailedAnswers,
  setDetailedAnswers : (a: number[]) => {
    detailedAnswers = a.map((answer: number)=> answer);
    console.log("answer updated: "+detailedAnswers);
  },
  getQuestionsAnswered: () => {return answeredQuestions},
  setQuestionsAnswered: (q: string[]) => {
    answeredQuestions = q.map((question: string)=> question);
    //answeredQuestions = q;
  },
  addQuestionsAnswered:(question: string) => {
    answeredQuestions = [...answeredQuestions, question];
    for(let i = 0; i < answeredQuestions.length; i++){
        console.log("question "+i+": "+answeredQuestions[i]);
    }
    console.log("new length "+answeredQuestions.length); 
  },
};*/
class QuestionStore {
    private detailedQuestions: string[] = [
      "How passionate are you about learning new skills and acquiring knowledge?",
      "How would you rate your ability to think creatively and generate innovative ideas?",
      "How confident are you in your ability to solve complex problems?",
      "To what extent do you embrace change and adapt quickly to new situations?",
      "How effectively do you cope with stress in challenging environments?",
      "How would you rate your capacity to analyze data and draw logical conclusions?",
      "How confident are you in your leadership abilities and managing teams?",
      "How well do you work collaboratively within a team?",
      "How effectively do you communicate your ideas to others, both verbally and in writing?",
      "How motivated are you to overcome obstacles and pursue long-term goals?",
      "How would you rate your attention to detail in completing tasks?",
      "How effectively do you prioritize tasks and manage your time?",
      "How quickly do you learn and master new concepts or skills?",
      "How comfortable are you with taking calculated risks in your career decisions?",
      "How inclined are you toward identifying opportunities and turning them into initiatives?",
      "How strong is your interest and aptitude in technical or specialized fields (e.g., IT, engineering)?",
      "How well do you understand and relate to people from diverse backgrounds?",
      "How disciplined are you in sticking to plans and achieving goals without external supervision?",
      "How important is ethical decision-making and integrity in your work?",
      "How eager are you to challenge the status quo and introduce changes or new methods?",
      "How ambitious are you regarding climbing the career ladder or achieving career milestones?",
      "How focused are you on understanding and meeting the needs of clients or customers?",
      "How effective are you at building and maintaining professional networks?",
      "How well do you recognize and manage your emotions and those of others?",
      "How confident are you in making decisions under uncertainty?",
      "How important is achieving balance between your work and personal life for you?",
      "How comfortable are you with uncertainty and ambiguous situations in your work?",
      "How willing are you to adopt new technologies or methodologies in your career?",
      "How focused are you on achieving measurable results in your work?",
      "How frequently do you reflect on your career progress and areas for personal improvement?",
      "How quickly do you integrate into unfamiliar teams or environments?",
      "How confident are you in making quick decisions when required?",
      "How would you rate your technical skills and expertise in your field?",
      "How comfortable are you with remote work and virtual team collaboration?",
      "How effectively do you set realistic, achievable goals?",
      "How open are you to receiving constructive feedback from peers and supervisors?",
      "How proactive are you in seeking new career opportunities or projects?",
      "How strong are your organizational and planning abilities?",
      "How proficient are you in using modern technology and industry-specific tools?",
      "How confident are you in effectively delegating tasks to team members?",
      "How comfortable are you collaborating with professionals from different departments or fields?",
      "How effectively do you incorporate data and analytics into your decision-making process?",
      "How skilled are you at mapping out long-term strategies for projects or career goals?",
      "How committed are you to investing time in your professional development and continuous learning?",
      "How open are you to working with teams from diverse cultural and professional backgrounds?",
      "How well do you handle managing multiple responsibilities simultaneously?",
      "How comfortable are you dealing with ambiguity or unclear job roles?",
      "How capable are you of explaining complex concepts in a clear and simple manner?",
      "How interested are you in staying updated with the latest trends and developments in your industry?",
      "How eager are you to take on new responsibilities and challenges at work?",
      "How would you rate your creativity when approaching professional challenges?",
      "How well do you manage stress and maintain performance under tight deadlines?",
      "How confident are you in your ability to work effectively without constant supervision?",
      "How adept are you at constructively resolving conflicts in the workplace?",
      "How attentive are you when others communicate ideas or feedback?",
      "How proficient are you in using digital tools to streamline your work?",
      "How confident are you in using performance metrics to evaluate and improve your work?",
      "How well do you balance creative thinking with the need for structure and process?",
      "How effectively do you learn from setbacks or professional failures?",
      "How willing are you to volunteer for challenging or high-stakes projects?",
      "How confident are you in your ability to negotiate outcomes or resources?",
      "How well do you manage and prioritize multiple projects at once?",
      "How capable are you at foreseeing potential obstacles in your career progression?",
      "How consistently do you maintain enthusiasm for your career over time?",
      "How proficient are you in communicating effectively across different cultural contexts?",
      "How effectively do you prioritize tasks during demanding periods?",
      "How well do you apply structured problem-solving methods in your work?",
      "How aware are you of your personal strengths and areas for improvement in a professional setting?",
      "How open are you to experimenting with and trying out new work methods?",
      "How inclined are you to mentor or coach colleagues in your field?",
      "How comfortable are you with taking responsibility for team outcomes?",
      "How resourceful are you in finding creative solutions to work problems?",
      "How effectively do you evaluate and critique your own performance?",
      "How interested are you in pursuing additional education or industry certifications?",
      "How willing are you to learn and adopt new software or industry tools?",
      "How comfortable are you with incorporating feedback from colleagues into your work?",
      "How actively do you contribute during brainstorming and idea-generation sessions?",
      "How willing are you to relocate for promising career opportunities?",
      "How adept are you at assessing potential risks in decision-making?",
      "How open are you to learning from colleagues with very different backgrounds or expertise?",
      "How confident are you in setting and achieving your career goals?",
      "How effective are you in managing and contributing to remote team collaborations?",
      "How eager are you to lead projects that drive significant change or transformation?",
      "How driven are you to exceed professional expectations in your role?",
      "How skilled are you at balancing independent responsibilities with collaborative work?",
      "How effective are you at building and maintaining valuable professional networks?",
      "How good are you at anticipating future industry trends and shifts?",
      "How interested are you in exploring roles that span multiple disciplines?",
      "How committed are you to staying current with industry news and innovations?",
      "How innovative are you in streamlining or optimizing daily work processes?",
      "How comfortable are you with receiving and working through challenging performance evaluations?",
      "How eager are you to take on leadership or management roles?",
      "How confident are you in managing project or departmental budgets effectively?",
      "How important is continuous innovation in your approach to work?",
      "How well do you adapt to and thrive in a fast-paced work environment?",
      "How effectively do you manage and overcome unexpected obstacles at work?",
      "How open are you to modifying or improving established procedures?",
      "How driven are you to continuously enhance your work performance?",
      "How quickly do you adapt when new technologies are introduced to your workplace?",
      "How willing are you to undertake tasks or projects that are outside your traditional job description?"
    ];
    private detailedAnswers: number[] = [];
    private answeredQuestions: string[] = [];
    private simpleQuestions: string[] = [
      "Do you enjoy math in school?",
      "Do you enjoy science classes?",
      "Do you enjoy reading and writing?",
      "Do you enjoy history or social studies?",
      "Do you enjoy art or music classes?",
      "Do you enjoy using computers at school?",
      "Do you enjoy building or fixing things?",
      "Do you enjoy working on group projects?",
      "Do you enjoy solving puzzles or brainteasers?",
      "Do you enjoy designing or creating things?",
      "Do you like spending time outdoors?",
      "Do you prefer working inside?",
      "Do you like helping people solve their problems?",
      "Do you enjoy organizing things?",
      "Do you like planning events or tasks?",
      "Do you enjoy leading teams or groups?",
      "Do you prefer following instructions over leading?",
      "Do you enjoy giving presentations?",
      "Are you comfortable speaking to strangers?",
      "Do you enjoy writing stories, essays, or journals?",
      "Do you enjoy drawing or painting?",
      "Do you enjoy playing musical instruments?",
      "Do you enjoy using technology to create things?",
      "Do you enjoy watching science experiments?",
      "Do you like learning about the human body or health?",
      "Do you enjoy helping friends when they’re upset?",
      "Do you enjoy volunteering in your community?",
      "Do you prefer hands-on work over desk work?",
      "Do you enjoy managing money or budgets?",
      "Do you like solving real-world problems?",
      "Do you enjoy analyzing data or patterns?",
      "Do you like imagining future inventions?",
      "Would you prefer a job with a consistent routine?",
      "Do you like surprises or changes in your day?",
      "Do you want a job where you move around a lot?",
      "Would you enjoy working at a computer most of the day?",
      "Do you want a job with flexible hours?",
      "Do you want a 9-to-5 type of job?",
      "Do you want to travel for work?",
      "Do you want to work in one location?",
      "Do you want a job with high earning potential?",
      "Do you want a job that helps people?",
      "Do you want a job that is creative?",
      "Do you want a job that is predictable?",
      "Is job security important to you?",
      "Do you want to go to college after high school?",
      "Would you consider going to trade school?",
      "Do you want to start working right after high school?",
      "Are you interested in starting your own business?",
      "Would you enjoy working for a big company?",
      "Would you enjoy working for a small business?",
      "Do you want to work for yourself one day?",
      "Would you enjoy having a uniform at work?",
      "Would you prefer dressing casually for work?",
      "Do you enjoy doing repetitive tasks?",
      "Do you prefer variety in your daily tasks?",
      "Do you like helping animals?",
      "Are you interested in environmental issues?",
      "Do you want a physically active job?",
      "Do you want a job that lets you sit most of the day?",
      "Are you comfortable working under pressure?",
      "Do you enjoy giving instructions to others?",
      "Do you prefer following someone else’s lead?",
      "Are you good at managing your time?",
      "Do you enjoy working on long-term projects?",
      "Do you like short tasks that can be completed quickly?",
      "Do you prefer working alone?",
      "Do you prefer working with a team?",
      "Do you enjoy debates and discussions?",
      "Do you enjoy doing research?",
      "Are you interested in how machines work?",
      "Do you like fixing broken items?",
      "Do you like learning new skills?",
      "Do you enjoy teaching others new things?",
      "Would you enjoy working with children?",
      "Would you enjoy working with the elderly?",
      "Do you enjoy working with numbers?",
      "Do you like setting goals and achieving them?",
      "Do you enjoy practicing public speaking?",
      "Do people often ask you for advice?",
      "Do you prefer making decisions quickly?",
      "Do you like taking your time to think things through?",
      "Are you interested in laws and how they work?",
      "Are you interested in how businesses operate?",
      "Are you interested in how cities are planned and built?",
      "Do you like staying up-to-date with the news?",
      "Do you like trying new things?",
      "Do you like routines that don’t change much?",
      "Do you feel comfortable using new apps or programs?",
      "Would you enjoy being in a leadership position?",
      "Would you prefer being behind the scenes?",
      "Do you like helping others reach their goals?",
      "Do you feel comfortable in emergency situations?",
      "Do you like fast-paced environments?",
      "Do you prefer quiet and calm environments?",
      "Do you want a job that makes a difference in the world?",
      "Do you want to work in a creative industry like film, music, or design?",
      "Would you enjoy working in healthcare?",
      "Would you enjoy working in construction or trades?",
      "Would you enjoy working in a lab or research setting?"
    ];
    

  
    getDetailed() {
      return this.detailedQuestions;
    }
  
    setDetailed(q: string[]) {
      this.detailedQuestions = [...q];
    }

    getSimple(){
      return this.simpleQuestions;
    }

    setSimple(q: string[]) {
      this.simpleQuestions = [...q];
    }
  
    getDetailedAnswers() {
      return this.detailedAnswers;
    }
  
    setDetailedAnswers(a: number[]) {
      this.detailedAnswers = [...a];
    }
  
    getQuestionsAnswered() {
      return this.answeredQuestions;
    }
  
    setQuestionsAnswered(q: string[]) {
      this.answeredQuestions = [...q];
    }
  
    addQuestionsAnswered(question: string) {
      this.answeredQuestions = [...this.answeredQuestions, question];
    }
  }
  
  export const StoreQuestions = new QuestionStore();