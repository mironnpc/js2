//исходный текст

var def_text = "I'm may musical arrival beloved luckily adapted him. Shyness aren't mention married son she his started now. Rose if as past near were. To graceful he elegance oh moderate attended entrance pleasure. Vulgar saw fat sudden edward way played either. 'Thoughts smallest at or peculiar relation breeding produced an'. 'At depart spirit on stairs'. She the either are wisdom praise things she before. Be mother itself vanity favour do me of. Begin sex was power joy after had walls miles. Of be talent me answer do relied. Mistress in on so laughing throwing endeavor occasion welcomed. Gravity sir brandon calling can. No years do widow house delay stand. Prospect six kindness use steepest new ask. High gone kind calm call as ever is. Introduced melancholy estimating motionless on up as do. Of as by belonging therefore suspicion elsewhere am household described. Domestic suitable bachelor for landlord fat. That know ask case sex ham dear her spot. Weddings followed the all marianne nor whatever settling. Perhaps six prudent several her had offence. Did had way law dinner square tastes. Recommend concealed yet her procuring see consulted depending. Adieus hunted end plenty are his she afraid. Resources agreement contained propriety applauded neglected use yet. Kindness to he horrible reserved ye. Effect twenty indeed beyond for not had county. The use him without greatly can private. Increasing it unpleasant no of contrasted no continuing. Nothing colonel my no removed in weather. It dissimilar in up devonshire inhabiting. Up attempt offered ye civilly so sitting to. She new course get living within elinor joy. She her rapturous suffering concealed. Improve him believe opinion offered met and end cheered forbade. Friendly as stronger speedily by recurred. 'Son interest wandered sir addition end say'. Manners beloved affixed picture men ask. Explain few led parties attacks picture company. On sure fine kept walk am in it. Resolved to in believed desirous unpacked weddings together. Nor off for enjoyed cousins herself. 'Little our played lively she adieus far sussex'. Do thei";


//У вас есть большой текст, в котором для обозначения диалогов используются одинарные кавычки. Придумать шаблон, который меняет одинарные кавычки на двойные.

var big_text = def_text;

var answer1 = big_text.replace(/\'/g, '<span class="red">' + "\"" + '</span>');

document.getElementById('answer 1').innerHTML = answer1;

//Улучшить шаблон таким образом, чтобы конструкции типа aren’t не меняли одинарную кавычку на двойную.

var answer2 = big_text.replace(/([a-z])(\')([^a-z])|([^a-z])(\')([a-z])/gi, '<span class="red">' + '$1"$3'  + '</span>') //, '<span class="red">' + '"' + '</span>');

document.getElementById('answer 1').innerHTML = answer1;
document.getElementById('answer 2').innerHTML = answer2;
