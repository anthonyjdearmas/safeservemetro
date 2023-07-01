/*
This file is for modifying package information for the entire website.

Changing the price here will edit the results in the Coursefinder tool and Enroll here page.
*/

export class PackageInformation {

    public static packageYourLocation = {
        pkgName : "ServSafe® at Your Location",
        abtInfo : `The in-person ServSafe® Course Review is presented in one day or less, according to 
        your level of preparedness. This in-person review of the ServSafe® food safety concepts,
        combined with the on-line course, prepares you for the actual Food Safety Manager Exam.
        Both the review and exam are on the same day. The review is held in our Bethlehem,
        PA office. You first prepare on-line, then decide when you are ready to attend the 
        in-person course review. The review is presented in either English or Spanish.
        Exam pass or fail result will be immediately available once you complete the exam.`,
        includedFeatures : [
          `Complete On-Line Course with Practice Quizzes and Exams`,
          `Travel to Your Location`,
          `In-Person Course Review at Your Location`,
          `Food Safety Manual for Future Reference`,
          `Official ServSafe® Exam`,
          `ServSafe® Certificate Valid for Five (5) Years in All States`
        ],
        singlePrice : "$269.00",
        multiplePrice : "$199.00 (per person)",
        multiplePpl : false,
        packageCheckoutSingleURL : "https://checkout.square.site/buy/SI5Y4NGJ5SQJSQXTYOQK2EJM",
        packageCheckoutMultipleURL : "https://checkout.square.site/buy/ANIJJIYNZALXCKO65OUICA2O",
        packageEnrollHereIcon : "assets/img/enrollhere/yourlocationpkg_icon.png"
       }
    
       public static packageBethlehem = {
        pkgName : "ServSafe® in Bethlehem, PA",
        abtInfo : `The in-person ServSafe® Course Review is presented in one day or less,
         according to your level of preparedness.  This in-person review of the ServSafe®
         food safety concepts, combined with the on-line course, prepares you for the
         actual Food Safety Manager Exam.  Both the review and exam are on the same day.
        The review is held in our Bethlehem, PA office. You first prepare on-line, 
        then decide when you are ready to attend the in-person course review.
        The review is presented in either English or Spanish. Exam pass or fail result
         will be immediately available once you complete the exam.`,
         includedFeatures : [
          `Complete On-Line Course with Practice Quizzes and Exams`,
          `In-Person Class Review`,
          `Food Safety Manual for Future Reference`,
          `Official ServSafe® Exam`,
          `ServSafe® Certificate Valid for Five (5) Years in All States`
        ],
        singlePrice : "$189.00",
        multiplePrice : "$179.00 (per person)",
        multiplePpl : false,
        packageCheckoutSingleURL : "https://checkout.square.site/buy/D2PHPAU3CM4E556CEJJ5NTB5",
        packageCheckoutMultipleURL : "https://checkout.square.site/buy/WRKOZ7S4J6MQBSUOR7N2EST7",
        packageEnrollHereIcon : "assets/img/enrollhere/bethlehempkg_icon.png"
       }
    
       public static packageExamOnly = {
        pkgName : "ServSafe® Exam Only",
        abtInfo : `This Exam Only option is an economical way for people who only need to take the actual 
        ServSafe® Food Safety Exam.  This option does not include the on-line course, or the practice quizzes
         and exams, training, review or manual.  This Exam Only option is offered only in our Bethlehem,
         PA location. All ServSafe® certification exams must be proctored by a registered proctor. 
        The proctor will verify the identity of the person taking the exam and is responsible for 
        exam administration.  We are certified ServSafe® instructors and registered ServSafe® proctors.
        Exams are administered in either English or Spanish. Exam pass or fail result will be immediately
         available once you complete the exam.`,
         includedFeatures : [
          `Official ServSafe® Food Safety Manager Exam`,
          `Exam Proctoring and Administration`,
          `ServSafe® Certificate Valid for Five (5) Years in All States`
        ],
        singlePrice : "$99.00 (per person)",
        multiplePrice : "",
        packageCheckoutSingleURL : "https://checkout.square.site/buy/RHFHNTMCEX2TYR6J2NLFWOLT",
        packageEnrollHereIcon : "assets/img/enrollhere/examonlypkg_icon.png"
       }

}