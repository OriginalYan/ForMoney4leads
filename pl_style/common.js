function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function getQueryParam(param) {
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + param + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(location.href);
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
        return '';
    } else {
        return decodeURIComponent(results[1]).replace(/\+/g, ' ');
    }
}

function rnd(from, to) {
    return Math.floor(from + (to - from) * Math.random())
}

function HTTPBuildQuery(data) {
    var tmp_arr = [];
    for (var i in data) {
        tmp_arr[tmp_arr.length] = encodeURIComponent(i) + '=' + encodeURIComponent(data[i].toString());
    }
    return tmp_arr.join('&');
}

var
    preLandUrl = 'http://google.ru/',
    animCfg = {
    16: {
        texts: ['1 неделя', '2 неделя', '3 неделя', '4 неделя'],
        sub: -4,
        ver: 'v1'
    },
    20: {
        texts: ['4 неделя', '5 неделя'],
        sub: -16,
        ver: 'v2'
    },
    25: {
        texts: ['2 неделя', '4 неделя', '6 неделя'],
        sub: -8,
        ver: 'v3'
    },
    30: {
        texts: ['1 месяц', '2 месяц'],
        sub: -16,
        ver: 'v4'
    },
    45: {
        texts: ['1 месяц', '2 месяц', '3 месяц'],
        sub: -15,
        ver: 'v3'
    },
    60: {
        texts: ['1 месяц', '2 месяц', '3 месяц', '4 месяц'],
        sub: -15,
        ver: 'v1'
    },
    75: {
        texts: ['1 месяц', '2 месяц', '3 месяц', '4 месяц', '5 месяц'],
        sub: -15,
        ver: 'v5'
    }
};

function initAnim(needLost){
    var i;
    for(i in animCfg){
        if(i >= needLost){
            break
        }
    }

    var
        cfg = animCfg[i],
        anim = $('.anim')
            .removeClass('run')
            .addClass(cfg.ver);

    cfg.texts.forEach(function(text, idx, arr){
        idx++;
        if(idx < arr.length){
            anim.find('.p' + idx + ' div').text(text);
            anim.find('.p' + idx + ' b').text(cfg.sub  + 'кг');
        }else{
            anim.find('.flag div').text(text);
            anim.find('.flag b').text( (-1 * (needLost + (idx - 1) * cfg.sub)) + 'кг');
        }
    })
}

$(function () {
    var data = $.cookie('form-data'),
        index = $.cookie('form-index'),
        barColor = $('.top-line__text').css('color');
    
    // index = 21; // FIXME remove line
    if(index == 11){
        $('form').deserialize(data);
        index = 0;
    }


    if (index) {
        $('.test__question-current').removeClass('test__question-current');
        $($('.test__question').get(index)).addClass('test__question-current');
        $('.test__progress-count').text((+index + 1) + '/11');
        $('.test__progress-bar-line').css('width', Math.ceil(100 * index / 11) + '%');
        $('form').deserialize(data);

        if(index > 0){
            $('.test__head').css('display', 'none');
        }
    }

    $('.owl-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 10000,
        loop: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $("a.policy").click(function () {
        window.open($(this).attr("href"), '', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=500,height=500');
        return false;
    });

    $('form').submit(function (e) {
        var current = $(this).find('.test__question-current'),
            next = current.next(),
            index = current.index();

        e.preventDefault();

        switch (index) {
            case 1:
                var age = $('[name=user-age]').val().trim();
                if (age == '' || parseInt(age) < 18 || parseInt(age) > 90 || !/^\d+$/.test(age)) {
                    showError('Введите корректный возраст цифрами');
                    return;
                }

                $('.test__head').css('display', 'none');
               /* yaCounter37685180.reachGoal('question1');*/
                break;

            case 2:
                var height = $('[name=user-height]').val().trim(),
                    weight = $('[name=user-weight]').val().trim();

                if (height == '' || weight == '') {
                    showError('Введите возраст, рост и вес');
                    return;
                }
                if (parseInt(height) < 80 || parseInt(height) > 250 || !/^\d+$/.test(height)) {
                    showError('Введите корректный рост цифрами');
                    return;
                }
                if (parseInt(weight) < 40 || parseInt(weight) > 250 || !/^\d+$/.test(weight)) {
                    showError('Введите корректный вес цифрами');
                    return;
                }
                /*yaCounter37685180.reachGoal('question2');*/
                break;

            case 3:
                var weight = parseInt($('[name=user-weight]').val().trim()),
                    hope = $('[name=user-hope]').val().trim();

                if (hope == '' || !/^\d+$/.test(hope) || ((weight - parseInt(hope)) < 40)) {
                    showError('Введите корректное значение цифрами');
                    return;
                }
               /* yaCounter37685180.reachGoal('question3');*/
                break;

            case 4:
                if (typeof $('[name=question-2]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
                /*yaCounter37685180.reachGoal('question4');*/
                break;

            case 5:
                if (typeof $('[name=question-n6]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
               /* yaCounter37685180.reachGoal('question5');*/
                break;

            case 6:
                if (typeof $('[name=question-4]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
                /*yaCounter37685180.reachGoal('question6');*/
                break;

            case 7:
                if (typeof $('[name=question-5]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
               // yaCounter37685180.reachGoal('question7');
                break;

            case 8:
                if (typeof $('[name=question-6]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
               // yaCounter37685180.reachGoal('question8');
                break;

            case 9:
                if (typeof $('[name=question-7]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
                //yaCounter37685180.reachGoal('question9');
                break;

            case 10:
                if (typeof $('[name=question-8]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
                //yaCounter37685180.reachGoal('question10');
                break;

            case 8:
                if (typeof $('[name=question-11]:checked').val() == 'undefined') {
                    showError('Вы не ответили на вопрос. Выберите вариант ответа и нажмите на кнопку “Ответить"');
                    return;
                }
               // yaCounter37685180.reachGoal('question8');
                break;
        }

        $.cookie('form-data', $(this).serialize());
        $.cookie('form-index', index);

        $('.test__question-alert')
            .html('')
            .css('padding', '0');

        current.removeClass('test__question-current');


        function showError(str) {
            $('.test__question-alert')
                .html(str)
                .css('padding', '15px');

            var rect = $('.test__question-alert').get(0).getBoundingClientRect();
            if(rect.top < 0){
                $(document.body)
                    .stop()
                    .animate({
                        scrollTop: (document.body.scrollTop + rect.top)
                    }, 500);
            }
        }

        $('.test__progress-count').text((index + 1) + '/11');

        if (next.hasClass('test__question')) {
            next.addClass('test__question-current');
            $('.test__progress-bar-line').css('width', Math.ceil(100 * index / 11) + '%');


            var rect = next.get(0).getBoundingClientRect();
            if(rect.top < 0){
                $(document.body).stop().animate({
                    scrollTop: (document.body.scrollTop + rect.top)
                }, 500);
            }


        } else {

            $('.test__question-total').show();

            $('.test__progress-name-name').text('Процесс вычисления результата');

            // $('.test__progress-bar-line').css('width', '0%');
            $('.test__progress-bar-line')
                .css({
                    'transition': 'none',
                    '-webkit-transition': 'none'
                })
                .css('width', '0');

            $('.pie_progress-1').asPieProgress({  // антропометрических
                'namespace': 'pie_progress-1',
                size: 100,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                numberCallback: function (n) {
                    return Math.round(n) + '<span style="font-size: 24px; line-height: 20px; "> <br>%</span>';
                },
                speed: 30 //###### Скорость 1

            });

            $('.pie_progress-2').asPieProgress({  // питания
                'namespace': 'pie_progress-2',
                size: 100,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                numberCallback: function (n) {
                    return Math.round(n) + '<span style="font-size: 24px; line-height: 20px; "> <br>%</span>';
                },
                speed: 40 // ###### Скорость 2

            });

            $('.pie_progress-3').asPieProgress({
                'namespace': 'pie_progress-3',
                size: 100,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                numberCallback: function (n) {
                    return Math.round(n) + '<span style="font-size: 24px; line-height: 20px; "> <br>%</span>';
                },
                speed: 60 // ###### Скорость 3

            });

            $('.pie_progress-6').asPieProgress({
                'namespace': 'pie_progress-6',
                size: 80,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                numberCallback: function (n) {
                    return Math.round(n) + '<span style="font-size: 24px; line-height: 18px; "> <br></span>';
                }
            });

            var progressBar = 0,
                mob = window.innerWidth <= 768,
                rect;


            if(mob){
                rect = $('.test__question-total-title').get(0).getBoundingClientRect()
                $(document.body).stop().animate({
                        scrollTop: (document.body.scrollTop + rect.top)
                    }, 500);

                $('button.test__question-table-item').click(function(){
                    $(this).slideUp();
                    $('.test__question-table').slideDown();
                });
            }

            $('.pie_progress-1').asPieProgress('go', '100%');
            setTimeout(function () {
                $('.pie_progress-2').asPieProgress('go', '100%');
                if(mob){
                    rect = $('.pie_progress-2').parent().get(0).getBoundingClientRect()
                    $(document.body).stop().animate({
                        scrollTop: (document.body.scrollTop + rect.top)
                    }, 500);
                }
                setTimeout(function () {
                    $('.pie_progress-3').asPieProgress('go', '100%');
                    if(mob){
                        rect = $('.pie_progress-3').parent().get(0).getBoundingClientRect()
                        $(document.body).stop().animate({
                            scrollTop: (document.body.scrollTop + rect.top)
                        }, 500);
                    }
                }, 4000); // ###### Задержка \ интервал между кругами
            }, 4000); // ###### Что-то, что тоже влияет, хз
            $('.test__progress-bar-line')
                .css({
                    'transition': 'width 39s linear', //##### скорость движения линии на финальном экране
                    '-webkit-transition': 'width 14s linear'
                })
                .css('width', '100%');


            (function anim() {
                if (progressBar < 100) {
                    progressBar += 1;
                    $('.test__progress-count').text(progressBar + '%');
                    setTimeout(anim, 140); // ##### Скорость изменения процентов загрузки на финальном экране
                } else {
                    if(mob){
                        $('.test__progress-name-name')
                            .text('Результат теста')
                            .parent()
                                .css('padding', 0);
                        $('.test__progress-bar').hide();
                    }else{
                        $('.test__progress-name-name').text('Готово');
                    }
                    $('.test__progress-count').text('');
                    $('.test__question-total-title').slideUp('slow');
                    $('.test__question-total-text').slideDown('slow', function(){
                        if(mob){
                            rect = $('.test__question-total-text').get(0).getBoundingClientRect()
                            $(document.body).stop().animate({
                                scrollTop: (document.body.scrollTop + rect.top)
                            }, 500);
                        }
                    });
                    $('.test__question-total-btn').slideDown('slow');
                }
            })();
        }
    });


    $('.test__question-total-btn .btn').click(function () {
        $('.test__question-total-text').remove();
        $('.test__question-total-btn').remove();
        $('.test__question-total-title').text('Результат теста');
        $('.test__question-total-wrapper-hide').hide();
        $('.test__question-total-wrapper-show').show(function () {

            var bodyType = $('input[name=question-n6]:checked').val(),// 1 - астенический, 2 - нормостенический, 3 - гиперстенический
                coeff = (bodyType == 1) ? 0.9 : ((bodyType == 2) ? 1 : 1.1),
                weight = parseInt($('input[name=user-weight]').val().trim()),
                height = parseInt($('input[name=user-height]').val().trim()),
                age = parseInt($('input[name=user-age]').val().trim()),
                hope = parseInt($('[name=user-hope]').val().trim()),
                bestWeight = Math.round((age < 40) ? ((height - 110) * coeff) : ((height - 100) * coeff)),
                needLost = ((weight - bestWeight) > 0) ? (weight - bestWeight) : 0,
                weightIndex = weight / (height * height),
                stage = ((weightIndex <= 0.0025) ? 0 : ((weightIndex <= 0.0035) ? 1 : ((weightIndex <= 0.0040) ? 2 : 3))),
                split = 2; //getQueryParam('sp');

            $('.pie_progress-4').asPieProgress({
                namespace: 'pie_progress-4',
                size: 100,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                rVal: bestWeight,
                numberCallback: function (n) {
                    return this.options.rVal + '<span style="font-size: 24px; line-height: 21px; "><br> кг</span>';
                }
            });
            $('.pie_progress-5').asPieProgress({
                'namespace': 'pie_progress-5',
                size: 100,
                barcolor: barColor,
                barsize: '12',
                trackcolor: '#fff',
                rVal: needLost,
                numberCallback: function (n) {
                    return this.options.rVal + '<span style="font-size: 24px; line-height: 21px; "><br> кг</span>';
                }
            });

            if(needLost <= 4){
                $('.test__question-text').html('По нашим расчетам, у вас нет лишнего веса. '+
                    'Вам не стоит снижать вес. Но мы рекомендуем вам проработать определенные зоны тела, сделать их более рельефными и упругими. '+
                    'У человека может быть идеальный вес, но дряблое тело с ярко выраженными проблемными зонами из-за жировой прослойки. '+                    
                    'Вы можете легко избавиться от жировых отложений без изнурительных тренировок и строгой диеты, которые '+
                    'в будущем принесут только вред вашему здоровью за то, что вы мучаете его.<br />'+
                    'Ваша задача: трансформировать лишние жировые отложения в мышечную массу, чтобы подчеркнуть ваши привлекательные черты. '+
                    'За счет правильного воздействия на организм, а не за счет издевательства над ним.<br />'+
                    'На основе ваших ответов мы подобрали вам методику, которая максимально подойдет именно вам. '
                );

                $('.test__question-table, .test__question-total-p, .test__question-total-a, .anim, .test__question-total-list').hide();
                $('.test__question-btn-text-span').html('Данная методика позволяет привести форму в порядок и похудеть (в зависимости от ваших целей) '+
                'Ознакомьтесь с данной методикой, прочитав реальную историю Анны Князевой, которая похудела на 47 '+
                'килограмм за 13 недель после прохождения нашего теста.');
            }else{

                var msg = 'Наша программа, разработанная 9 профессиональными диетологами России и Европы, '+
                'проанализировала ваши ответы. На основании их мы выявили следующее: вы хотите сбросить ' + hope + ' ' +
                declOfNum(hope, ['килограмм', 'килограмма', 'килограмм']) +
                ', но по нашим расчетам, у вас наблюдается приблизительно ' + needLost + ' ' +
                declOfNum(needLost, ['лишний килограм', 'лишних килограмма', 'лишних килограмм']) +
                ' , что соответствует ';
                switch (stage) {
                    case 1:
                        msg += 'первой степени ожирения. Ваш вес превышает нормальный на ' +
                        Math.round(((weight / bestWeight) - 1) * 100) +
                        '%.';
                        break;
                    case 2:
                        msg += 'второй степени ожирения. Ваш вес превышает нормальный на ' +
                        Math.round(((weight / bestWeight) - 1) * 100) +
                        '%.';
                        break;
                    case 3:
                        msg += 'третьей степени ожирения. Ваш вес превышает нормальный на ' +
                        Math.round(((weight / bestWeight) - 1) * 100) +
                        '%.';
                        break;
                }

//                msg += '<br />Вы находитесь в зоне риска заболеваний:'
                msg += '<br /><br />'
                $('.test__question-text').html(msg);

                if(split == 2){
                    msg = 'На основе ваших ответов мы подобрали <span class="strong">1 из 342 ' +
                    'способов избавления от лишнего веса</span>, который максимально подойдет именно вам <span class="strong">(на 95,3%)</span> ' +
                    'Вам подошло натуральное диетологическое средство «Slimmer», которое избавит вас от многих проблем со здоровьем. ' +
                    '«Slimmer» - уникальный продукт, который способен избавить вас от лишнего веса без физических нагрузок с вашей стороны. ' +
                    'Он также препятствует возвращению лишних килограмм после окончания курса, закрепляя результат. ' +
                    'Вам не стоит опасаться растяжек, ухудшения пищеварения и каких-либо других побочных эффектов после его применения. ' +
                    'Данный продукт прошел все клинические исследования. В состав средства «Slimmer» входят только натуральные компоненты. ' +
                    ' Он поможет вам сбросить лишние ';
                }else{
                    msg = 'Если вы похудеете, то избавитесь от многих ' +
                    'проблем со здоровьем. На основе ваших ответов мы подобрали <span class="strong">1 из 342 ' +
                    'методик по похудению</span>, которая максимально подходит вам <span class="strong">(на 95,3%)</span> ' +
                    ' Она поможет вам сбросить лишние ';
                }

                if (hope < needLost) {
                    msg += '<span class="strong">' + hope + ' кг за ' + Math.round(hope * 2) + ' ' +
                    declOfNum(hope * 2, ['день', 'дня', 'дней']) + '</span> без вреда для здоровья.' +
                    ' Но это не предел, при желании вы сможете достичь своего идеального веса <span class="strong">' + bestWeight + ' кг за ' +
                    (needLost * 2) + ' ' + declOfNum(needLost * 2, ['день', 'дня', 'дней']) + '</span>.';
                } else if (hope > needLost) {
                    msg += '<span class="strong">' + needLost + ' кг за ' + (needLost * 2) + ' ' + declOfNum(needLost * 2, ['день', 'дня', 'дней']) +
                    '</span> без вреда для здоровья.' +
                    ' Но мы видим, что вы хотите похудеть на ' + hope + ' кг. Это больше рекомендуемой ' +
                    'нами цифры. Поэтому прежде чем худеть на более ' + needLost + ' кг, мы советуем вам' +
                    ' обратиться к специалисту за консультацией.';
                }

                // msg += '<br /><br />Подробнее о продукте вы можете ознакомиться на официальном сайте.';

                $('.test__question-total-p').html(msg);
            }


            $('.pie_progress-4').asPieProgress('go', 100 + '%');
            $('.pie_progress-5').asPieProgress('go', 100 + '%');
            $('.pie_progress-6').asPieProgress('go');


            // Истории
            var q6 = $('input[name=question-4]:checked').val(),
                q7 = $('input[name=question-5]:checked').val(),
                q8 = $('input[name=question-6]:checked').val(),
                q15 = $('input[name=question-14]:checked').val(),
                q16 = $('input[name=question-15]:checked').val(),
                q19 = $('input[name=question-18]:checked').val(),
                q18 = $('input[name=question-17]:checked').val(),
                lid = '',
                postfix = '_pr',
                storyData = {
                    '29_l25': {
                        name: 'Оксаны Михайдаровой',
                        lost: 18,
                        time: '5 недель'
                    },
                    '29_l40': {
                        name: 'Алены Жучковой',
                        lost: 35,
                        time: '8 недель'
                    },
                    '29_g40': {
                        name: 'Ольги Михайловой',
                        lost: 42,
                        time: '13 недель'
                    },
                    '44_l25': {
                        name: 'Евгении Новоселовой',
                        lost: 25,
                        time: '6 недель'
                    },
                    '44_l40': {
                        name: 'Марины Минаевой',
                        lost: 37,
                        time: '8 недель'
                    },
                    '44_g40': {
                        name: 'Анны Князевой',
                        lost: 47,
                        time: '13 недель'
                    }
                }

            if(age <= 40){
                if(needLost < 25){
                    lid = '29_l25';
                }else if(needLost < 40){
                    lid = '29_l40';
                }else{
                    lid = '29_g40';
                }
            }else{
                if(needLost < 25){
                    lid = '44_l25';
                }else if(needLost < 40){
                    lid = '44_l40';
                }else{
                    lid = '44_g40';
                }
            }

            if(q19 == 2){
                postfix = '_td';
            } else if(q18 == 5){
                postfix = '_bm';
            };

            // FIXME
            lid = '44_g40';
            postfix = '_pr';

            /*if(needLost <= 4){
                postfix = '_dr';
            }*/

            /*if(rnd(0, 100) > 50){
                postfix = '_td';
            }*/

            $('.his_name').text(storyData[lid].name);
            $('.his_lost').text(storyData[lid].lost + ' ' + declOfNum(storyData[lid].lost, ['килограмм', 'килограмма', 'килограмм']));
            $('.his_time').text(storyData[lid].time);

           /* $('.his_link').attr('href', ''preLandUrl + '&' + HTTPBuildQuery({
                utm_source: lid + postfix,
                utm_campaign: age,
                utm_content: getQueryParam('utm_campaign'),
                sub_id: getQueryParam('click_id')
            }));*/

           /* yaCounter37685180.reachGoal('testend', {age: age, height: height, hope: hope, needLost: needLost});
            yaCounter37685180.userParams({age: age, height: height, hope: hope, needLost: needLost});*/


            initAnim(needLost);

            var scrolled = false,
                animScrolled = false;
            $(window).scroll(function () {
                if (!scrolled && $(this).scrollTop() > 250) {
                    scrolled = true;
                    var from = 0,
                        to = 100;

                    switch (stage) {
                        case 0:
                            if (age <= 30) {
                                from = 15;
                                to = 25;
                            } else if (age <= 50) {
                                from = 26;
                                to = 36;
                            } else {
                                from = 37;
                                to = 60;
                            }
                            break;
                        case 1:
                            if (age <= 30) {
                                from = 22;
                                to = 37;
                            } else if (age <= 50) {
                                from = 34;
                                to = 48;
                            } else {
                                from = 49;
                                to = 65;
                            }
                            break;
                        case 2:
                            if (age <= 30) {
                                from = 35;
                                to = 50;
                            } else if (age <= 50) {
                                from = 40;
                                to = 60;
                            } else {
                                from = 55;
                                to = 80;
                            }
                            break;
                        case 3:
                            if (age <= 30) {
                                from = 45;
                                to = 70;
                            } else if (age <= 50) {
                                from = 55;
                                to = 80;
                            } else {
                                from = 70;
                                to = 95;
                            }
                            break;
                    }
                    var persent1 = rnd(from, to),
                        persent2 = rnd(from, to),
                        persent3 = rnd(from, to),
                        persent4 = rnd(from, to),
                        persent5 = rnd(from, to),
                        persent6 = rnd(from, to);

                    if ($('input[name=question-15]:checked').val() == 1) {
                        persent1 = rnd(70, 90);
                    }

                    var colorRed = '#d24a43';
                    var colorEllow = '#e18c44';
                    var colorGrin = '#bdef75';

                    $('.pie_progress-7').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent1 <= 30 ) ? colorGrin : ((persent1 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });

                    $('.pie_progress-8').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent2 <= 30 ) ? colorGrin : ((persent2 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });

                    $('.pie_progress-9').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent3 <= 30 ) ? colorGrin : ((persent3 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });

                    $('.pie_progress-10').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent4 <= 30 ) ? colorGrin : ((persent4 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });

                    $('.pie_progress-11').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent5 <= 30 ) ? colorGrin : ((persent5 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });

                    $('.pie_progress-12').asPieProgress({
                        'namespace': 'pie_progress-6',
                        size: 100,
                        barcolor: (persent6 <= 30 ) ? colorGrin : ((persent6 <= 60 ) ? colorEllow : colorRed),
                        barsize: '8',
                        trackcolor: '#fff',
                        fillcolor: (window.innerWidth < 400) ? '#167db1' : 'transparent',
                        numberCallback: function (n) {
                            return Math.round(n) + '<span style="font-size: 12px;  ">%</span>';
                        },
                    });


                    $('.pie_progress-7').asPieProgress('go', persent1 + '%');
                    $('.pie_progress-8').asPieProgress('go', persent2 + '%');
                    $('.pie_progress-9').asPieProgress('go', persent3 + '%');
                    $('.pie_progress-10').asPieProgress('go', persent4 + '%');
                    $('.pie_progress-11').asPieProgress('go', persent5 + '%');
                    $('.pie_progress-12').asPieProgress('go', persent6 + '%');
                }


                var animTop = $('.anim').get(0).getBoundingClientRect().top;
                if(!animScrolled && animTop > 0 && (animTop < window.innerHeight - 70)){
                    animScrolled = true;

                    (function cicleAnim(){
                        $('.anim').addClass('run');
                        setTimeout(function(){
                            $('.anim').removeClass('run');
                            setTimeout(cicleAnim, 2000);
                        }, 10000);
                    })();

                }

            });


            if ($('#radio-8-1').prop("checked") || $('#radio-8-2').prop("checked")) {
                $('.test__question-total-list').append('<li>Периодически употребляет пищу после полуночи </li>')
            }

            if ($('#radio-14-1').prop("checked") || $('radio-14-2').prop("checked")) {
                $('.test__question-total-list').append('<li>Генетически предрасположены к лишнему весу (есть полные родственники)</li>')
            }

            var type = parseInt($('input[name=question-n6]:checked').val());
            switch (type) {// 1 - астенический, 2 - нормостенический, 3 - гиперстенический
                case 1:
                    $('.test__question-total-list').append('<li>Для людей с астеническим типом телосложения</li>');
                    break;
                case 2:
                    $('.test__question-total-list').append('<li>Для людей с нормостеническим типом телосложения</li>');
                    break;
                case 3:
                    $('.test__question-total-list').append('<li>Для людей с гиперстеническим типом телосложения</li>');
                    break;
            }

            if ($('#radio-15-1').prop("checked")) {
                $('.test__question-total-list').append('<li>Имеют заболевания, связанные с уровнем сахара в крови </li>')
            }

            if ($('#radio-16-1').prop("checked") || $('#radio-16-2').prop("checked")) {
                $('.test__question-total-list').append('<li>Ведут малоподвижный образ жизни </li>')
            }

            if ($('#radio-18-1').prop("checked")) {
                $('.test__question-total-list').append('<li>Набрали вес во время беременности или после рождения ребенка </li>')
            }

            if ($('radio-18-2').prop("checked")) {
                $('.test__question-total-list').append('<li>Имеют проблемы с лишним весом с дества </li>')
            }

            if(split == 2){
                $('.test__question-total-a').text('С помощью данного средства вы похудеете на '+ needLost +' кг за '+
                    (needLost * 2) + ' ' + declOfNum(needLost * 2, ['день', 'дня', 'дней'])
                );
            }else{
                $('.test__question-total-a').text('С помощью данной методики вы похудеете на '+ needLost +' кг за '+
                    (needLost * 2) + ' ' + declOfNum(needLost * 2, ['день', 'дня', 'дней'])
                );
            }
        });

    });

    $('.test__question--email').blur(function() {
        if($(this).val() != '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test($(this).val())){
                $(this).css({'border' : '1px solid #569b44'});
                $('.input-check').css('display', 'inline');
            } else {
                $(this).css({'border' : '1px solid #ff0000'});
                alert('Введите корректные данные');
            }
        } else {
            // Поле email пустое, выводим предупреждающее сообщение
            $(this).css({'border' : '1px solid #ff0000'});
            alert('Поле email не должно быть пустым');
        }
    });
});
