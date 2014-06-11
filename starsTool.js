/*
 * bravfing@126.com
 * 2014.6.11
 */
starsTool = function (){
    var rulesTable = {
        phone : /^\d{11}$/,
        number : /^\d+$/
    }

    return {
        get : function (form){
            var me = this
            var $form = $(form)
            var formControl = stars.control($form)

            $form.find('*[data-stars-rules]').each(function (){
                var controlObj = me.getControlObj($(this))
                formControl.add(controlObj)
            })

            return formControl
        },
        getControlObj : function ($element){
            var me = this
            var rules = $element.attr('data-stars-rules').split(' ')
            var ruleMsg = $element.attr('data-stars-msg')
            var ruleTipEle = $element.attr('data-stars-tipEle')

            var controlObj = stars.control($element)
            if (ruleTipEle){
                controlObj.setTipEle(ruleTipEle)
            }

            var andRuleObj = new stars.AndRule()
            var hasEmpty = false

            $(rules).each(function (){
                var rule

                if (this=='empty'){
                    hasEmpty = true
                    return
                }

                //规则判断
                if (this=='required'){
                    rule = stars.required(ruleMsg)
                }
                else if (this.slice(0, 5)=='range'){
                    var arr = this.split('_')
                    rule = stars.length([arr[1], arr[2]], ruleMsg)
                }
                else if (this.slice(0, 6)=='regexp'){
                    var arr = this.split('_')
                    try{
                        var regexp = new RegExp(arr[1])
                        rule = stars.rule(regexp, ruleMsg)
                    }
                    catch(ex){}
                }
                else {
                    rule = stars.rule(rulesTable[this], ruleMsg)
                }

                andRuleObj.add(rule)
            })

            //如果有empty
            if (hasEmpty){
                var orRuleObj = new stars.OrRule()
                orRuleObj.add(stars.not(stars.required()))
                orRuleObj.add(andRuleObj)
                controlObj.add(orRuleObj)
            }
            else {
                controlObj.add(andRuleObj)
            }
            return controlObj
        }
    }
}()