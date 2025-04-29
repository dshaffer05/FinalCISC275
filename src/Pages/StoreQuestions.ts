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
    private detailedQuestions: string[] = [];
    private detailedAnswers: number[] = [];
    private answeredQuestions: string[] = [];
  
    getDetailed() {
      return this.detailedQuestions;
    }
  
    /*setDetailed(q: string[]) {
      this.detailedQuestions = [...q];
    }
  
    getDetailedAnswers() {
      return this.detailedAnswers;
    }*/
  
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