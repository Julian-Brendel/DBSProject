var SexyTable;!function(t){if(t.AutoMakeSexy=!0,"undefined"==typeof jQuery)throw new Error("SexyTable requires jQuery, see: http://jquery.com/");$(document).ready(function(){t.AutoMakeSexy&&$(".sexy-table").each(function(e,i){new t.Table(i)})})}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.onEditCallBacks=new Array,this.deBounceWait=250,this.container=this.table.GetContainer(),this.mirror=$("<span />"),this.mirror.css({position:"absolute",top:"-999px",left:"0px","white-space":"pre"}),$("body").append(this.mirror),this.InsertEditFields()}return t.prototype.OnEdit=function(t){this.onEditCallBacks.push(t)},t.prototype.InsertEditFields=function(){var t=this;this.table.GetCells().each(function(e,i){if(t.IsCellEditable(i)&&!($(i).find("input").length>0)){var r=$(i).find(".inner"),n=r.text(),a=$("<input />");a.attr("type","text"),a.val(n);var s=t.OnSave.bind(t,r);Mousetrap(a[0]).bind(["enter","mod+s"],s),a.keyup(s),r.empty().append(a)}})},t.prototype.ReAttachEventHandlers=function(){this.table.GetCells().parents(".tbody").find("input").each(function(t,e){$(e).keyup(this.OnSave.bind(this,$(e).parents(".inner")))}.bind(this))},t.prototype.IsCellEditable=function(t){if($(t).parents(".thead").length>0)return!1;if($(t).data("no-edit")===!0)return!1;var e=$(t).find(".inner"),i=this.table.GetReader().GetHeading(e);return"undefined"==typeof i?!1:""===i?!1:!0},t.prototype.OnSave=function(t){return clearTimeout(this.deBounceTimeout),this.deBounceTimeout=setTimeout(function(){this.table.GetCells().parents(".tbody").find("input").each(this.SetWidthOfInput.bind(this)),this.table.HasSearcher()?(this.table.GetSizer().ForceResize(),this.table.GetReader().UpdateOriginal(t),this.table.GetSearcher().BuildIndexes()):this.table.Refresh(),this.table.GetColumns().forEach(function(t){var e=-1;t.forEach(function(t){var i=$(t).find("input").width();i>e&&(e=i)}),t.forEach(function(t){$(t).find("input").width(e)})});var e,i=t.find("input").val(),r=this.table.GetReader().GetHeading(t);e=1==t.parents("ul[id]").length?parseInt(t.parents("ul[id]").attr("id")):this.container.find(".tbody").find("ul").index(t.parents("ul")),this.onEditCallBacks.forEach(function(n){n(e,r,i,t)})}.bind(this),this.deBounceWait),!1},t.prototype.SetWidthOfInput=function(t,e){$.each(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],function(t,i){this.mirror[0].style[i]=$(e).css(i)}.bind(this)),this.mirror.text($(e).val());var i=$(e).width(),r=this.mirror.width();r>i&&(r+=5,$(e).width(r))},t}();t.Editor=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.container=this.table.GetContainer(),this.EnsureTableHasThead(),this.InsertFilterInputs()}return t.prototype.ResetFilters=function(){this.container.find(".thead input").val("")},t.prototype.EnsureTableHasThead=function(){if(2!=this.container.find(".thead, .tbody").length)throw new Error("Sortable tables MUST use .thead and .tbody containers!")},t.prototype.InsertFilterInputs=function(){for(var t=this.table.GetReader().GetHeadings(),e=$("<ul></ul>"),i=0;i<t.length;i++){var r=$('<li><div class="inner"></div></li>');if(""!=t[i]){var n=$('<input name="'+t[i]+'" type="text" placeholder="All" />');n.keyup(this.OnFilter.bind(this,n)),r.find(".inner").append(n)}e.append(r)}this.container.find(".thead").append(e)},t.prototype.OnFilter=function(t){this.container.find(".thead input").not(t).val(""),this.table.GetSearcher().Query($(t).val(),$(t).attr("name"))},t}();t.Filterer=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t,e){this.table=t,this.nextCb=e,this.FirstPage=!1,this.rows=0,this.atEnd=!1,this.container=this.table.GetContainer(),this.container.find(".tbody").is(":empty")&&(this.FirstPage=!0,this.GetNext()),$(window).scroll(this.OnScroll.bind(this))}return t.prototype.OnScroll=function(){if(!this.atEnd){var t=$(document).height(),e=$(window).height(),i=$(window).scrollTop();i+e==t&&(this.rows=this.container.find(".tbody ul").length,this.GetNext())}},t.prototype.OnSort=function(t,e){this.rows=0,this.atEnd=!1,this.sort={column:t,direction:e},this.GetNext()},t.prototype.OnSearch=function(t,e){this.rows=0,this.atEnd=!1,this.search={column:t,terms:e},this.GetNext()},t.prototype.GetNext=function(){this.nextCb(this.rows,this.sort,this.search,this.OnResponse.bind(this))},t.prototype.OnResponse=function(t){if(null==t)return void(this.atEnd=!0);if(0==this.rows?this.table.GetWriter().Replace(t):this.table.GetWriter().Append(t),this.FirstPage){try{this.table.GetSorter().UseServer(this.OnSort.bind(this))}catch(e){}try{this.table.GetSearcher().UseServer(this.OnSearch.bind(this))}catch(e){}this.FirstPage=!1}},t}();t.Pager=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.container=this.table.GetContainer(),this.original=this.Serialize().slice(0)}return t.prototype.GetHeadings=function(){return this.headings},t.prototype.GetSerialized=function(){return this.serialized},t.prototype.GetOriginal=function(){return this.original},t.prototype.Serialize=function(t){return void 0===t&&(t=!1),this.serialized=[],this.headings=this.ExtractHeadings(),0==this.container.find(".tbody").length?this.container.find("ul").each(this.AddRow.bind(this)):this.container.find(".tbody ul").each(this.AddRow.bind(this)),t&&(this.original=this.serialized.slice(0)),this.serialized},t.prototype.ToJson=function(t){void 0===t&&(t=!0);var e,i=[];e=t?this.serialized:this.Serialize();for(var r=0;r<e.length;r++){var n={};for(var a in e[r])"_dom"!=a&&"_guid"!=a&&(n[a]=e[r][a]);i.push(n)}return JSON.stringify(i)},t.prototype.ExtractHeadings=function(){var t=[];if(0==this.container.find(".thead").length)for(var e=this.container.find("ul").first().find("li").length,i=0;e>i;i++)t.push("col_"+i);else this.table.HasWriter()?this.container.find(".data-bind-template ul").first().find("li").each(function(e,i){var r=$(i).data("bind");void 0===r&&(r=""),t.push(r)}):this.container.find(".thead ul").first().find("li").each(function(e,i){t.push($(i).find(".inner").text().toLowerCase().replace(" ","_"))});return t},t.prototype.AddRow=function(t,e){var i={},r=this;i._guid=this.CreateGuid(),i._dom=e,$(e).find("li").each(function(t,e){""!=r.headings[t]&&(1===$(e).find("input").length?i[r.headings[t]]=$(e).find("input").val():i[r.headings[t]]=$(e).find(".inner").text())}),this.serialized.push(i)},t.prototype.CreateGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,i="x"===t?e:3&e|8;return i.toString(16)})},t.prototype.UpdateOriginal=function(t){for(var e=t.parents("ul"),i=0;i<this.original.length;i++){var r=this.original[i];if(r._dom===e[0]){var n=e.find(".inner").index(t),a=this.headings[n];1===t.find("input").length?r[a]=t.find("input").val():r[a]=t.text();break}}},t.prototype.GetHeading=function(t){return this.headings[t.parents("ul").find(".inner").index(t)]},t}();t.Reader=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.container=this.table.GetContainer(),this.EnsureTableHasThead(),this.BuildIndexes()}return t.prototype.EnsureTableHasThead=function(){if(2!=this.container.find(".thead, .tbody").length)throw new Error("Searchable tables MUST use .thead and .tbody containers!")},t.prototype.UseServer=function(t){this.serverCb=t},t.prototype.Query=function(t,e){if(void 0===e&&(e="all"),null==t||""==t)return void this.table.Reset();if(null!=this.serverCb)return void this.serverCb(e,t);var i=new Array;i="all"==e?this.index.search(t):this.perColIndexes[e].search(t);var r=new Array,n=this.table.GetReader().GetOriginal();for(var a in i)for(var s in n)i[a].ref==n[s]._guid&&r.push(n[s]);this.table.HasSorter()&&this.table.GetSorter().Sort(r),this.table.Redraw(r,!0,!0)},t.prototype.BuildIndexes=function(){if(null==this.serverCb){var t=this.table.GetReader().GetOriginal();this.index=this.BuildIndexSchema();for(var e in t){var i={};for(var r in t[e])"_guid"==r?i._guid=t[e]._guid:"_dom"!=r&&(i[r+"Exact"]=t[e][r],i[r]=this.PrepareIndexValue(t[e][r]));this.index.add(i)}this.perColIndexes={};for(var e in t)for(var r in t[e])"_guid"!=r&&"_dom"!=r&&(this.perColIndexes.hasOwnProperty(r)||(this.perColIndexes[r]=lunr(function(){this.ref("_guid"),this.field("colValueExact",{boost:10}),this.field("colValue")})),this.perColIndexes[r].add({_guid:t[e]._guid,colValueExact:t[e][r],colValue:this.PrepareIndexValue(t[e][r])}))}},t.prototype.BuildIndexSchema=function(){var t=this.table.GetReader().GetHeadings();return lunr(function(){this.ref("_guid");for(var e=0;e<t.length;e++)"_guid"!=t[e]&&"_dom"!=t[e]&&(this.field(t[e]+"Exact",{boost:10}),this.field(t[e]))})},t.prototype.PrepareIndexValue=function(t){return t.trim().replace(/[^\w\s]/gi," ")},t}();t.Searcher=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.container=this.table.GetContainer(),this.ForceResize(),this.UnhideContainer(),$(window).resize(this.ForceResize.bind(this))}return t.prototype.ForceResize=function(){this.container.width("100%"),this.table.GetCells().removeData("dont-resize"),this.table.GetCells().css("width","auto"),this.table.GetRows().css("height","auto"),this.SetWidthOfColumns(),this.SetHeightOfRows(),this.IncreaseLastColumn(),this.CheckForOverFlownRows(this.table.GetColumns())},t.prototype.SetWidthOfColumns=function(){var t=this.table.GetColumns(),e=[];t.forEach(function(t){var i=-1;t.forEach(function(t){if(1!=$(t).find("input").length||1!=$(t).parents(".thead").length){var e=$(t).outerWidth(!0);e>i&&(i=e)}},this),e.push(i)},this);var i=e.reduce(function(t,e){return t+e},0);t.forEach(function(t,r){var n=e[r]/i*100+"%";t.forEach(function(t){$(t).css("width",n)})});var r=0;this.table.GetColumns().forEach(function(t,e){var i=this.GetColWidths(t);r+=i.diff,t.forEach(function(t){$(t).css("width",i.max)})},this),r+=this.GetRowPadding(),this.ReDistributeWidth(r,t)},t.prototype.ReDistributeWidth=function(t,e){for(var i=t/this.GetResizeableCols(),r=0,n=0;n<e.length;n++){var a=e[n];if($(a[0]).data("dont-resize")!==!0){var s=this.GetColumnWidth(a),o=s-i;1>=t&&(o=s-1);for(var h=-1,l=0;l<a.length;l++){var d=a[l];$(d).css("width",o);var u=$(d).find(".inner").outerWidth(!0);u>o&&($(d).css("width",u),u>h&&(h=u))}for(var c=this.GetColumnWidth(a),l=0;l<a.length;l++)$(a[l]).css("width",c);if(h>0){if($(a[0]).data("dont-resize",!0),1>=t&&this.GetResizeableCols()>0)continue;r+=h-o}else if(1>=t)break}}r>0&&(this.GetResizeableCols()>0?this.ReDistributeWidth(r,e):this.container.css("width",this.GetMinimumTableSize()))},t.prototype.SetHeightOfRows=function(){var t=this;this.table.GetRows().each(function(e,i){$(i).css("height",t.CalculateRowHeight(i))});var e=this.table.GetRows().last();e.css("height",e.outerHeight(!0)+this.GetRowBorder())},t.prototype.CalculateRowHeight=function(t){var e=-1;return $(t).find("li").each(function(t,i){$(i).outerHeight(!0)>e&&(e=$(i).outerHeight(!0))}),e+this.GetRowBorder()},t.prototype.IncreaseLastColumn=function(){var t=this;this.table.GetRows().each(function(e,i){var r=0;$(i).find("li").each(function(t,e){r+=$(e).outerWidth(!0)});var n=$(i).innerWidth()-r;if(n-=t.GetRowPadding(),n>0){var a=$(i).find("li").last();a.css("width",a.outerWidth(!0)+n)}})},t.prototype.CheckForOverFlownRows=function(t,e){if(void 0===e&&(e=0),!(e>10)){var i=this,r=!1;this.table.GetRows().each(function(e,n){if($(n).prop("scrollHeight")>$(n).outerHeight()){var a=0;$(n).find("li").each(function(t,e){a+=$(e).outerWidth(!0)});var s=a-$(n).innerWidth();1>s&&(s=i.GetColumnBorder()),i.ReDistributeWidth(s,t),$(n).css("height","auto"),$(n).css("height",i.CalculateRowHeight(n)),r=!0}}),r&&this.CheckForOverFlownRows(t,++e)}},t.prototype.GetMinimumTableSize=function(){var t=0,e=this.GetColumnBorder(),i=this.table.GetRows().first();return i.find("li").each(function(i,r){t+=$(r).find(".inner").outerWidth(!0),t+=e}),t+=this.GetRowPadding(),t+=e},t.prototype.GetResizeableCols=function(){for(var t=this.table.GetColumns(),e=this.GetNumberOfCols(),i=0;i<t.length;i++)$(t[i][0]).data("dont-resize")===!0&&--e;return e},t.prototype.GetColWidths=function(t){for(var e=[],i=0;i<t.length;i++)e.push($(t[i]).find(".inner").outerWidth(!0)+this.GetColumnBorder());var r=Math.min.apply(null,e),n=Math.max.apply(null,e),a=n-r;if(parseInt($(t[0]).css("min-width"))>0&&0==a){if("undefined"==typeof $(t[0]).data("min-width")){var s=$(t[0]).css("min-width");$(t[0]).css("min-width","0"),r=$(t[0]).find(".inner").outerWidth(!0)+this.GetColumnBorder(),$(t[0]).data("min-width",r),$(t[0]).css("min-width",s)}else r=$(t[0]).data("min-width");a=n-r}return{widths:e,min:r,max:n,diff:a}},t.prototype.GetColumnWidth=function(t){for(var e=[],i=0;i<t.length;i++)e.push($(t[i]).outerWidth(!0));return Math.max.apply(null,e)},t.prototype.GetRowBorder=function(){var t=this.container.find("ul").first();return t.outerHeight(!0)-t.innerHeight()},t.prototype.GetRowPadding=function(){var t=this.container.find("ul").first();return t.outerWidth(!0)-t.width()},t.prototype.GetColumnBorder=function(){var t=this.container.find("li").first();return t.outerWidth(!0)-t.innerWidth()},t.prototype.GetNumberOfCols=function(){return this.table.GetColumns().length},t.prototype.UnhideContainer=function(){this.container.css("visibility","visible")},t}();t.Sizer=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.caseInsensitive=!0,this.container=this.table.GetContainer(),this.EnsureTableHasThead(),this.InsertSortableToggles(),this.customSorters={"*":this.naturalSort}}return t.prototype.EnsureTableHasThead=function(){if(2!=this.container.find(".thead, .tbody").length)throw new Error("Sortable tables MUST use .thead and .tbody containers!")},t.prototype.UseServer=function(t){this.serverCb=t},t.prototype.SetCustomSorter=function(t,e){this.customSorters[t]=e},t.prototype.ResetSortIcons=function(){var t=this.container.find(".thead i");t.removeClass("fa-sort-asc"),t.removeClass("fa-sort-desc"),t.addClass("fa-sort")},t.prototype.Sort=function(t){var e,i,r=this;this.container.find(".thead i").each(function(t,n){return $(n).hasClass("fa-sort-asc")?i="asc":$(n).hasClass("fa-sort-desc")&&(i="desc"),null!=i?(e=r.table.GetReader().GetHeading($(n).parent()),!1):void 0}),null!=i&&(t.sort(this.sortByKey(e,this.selectSorter(e))),"desc"==i&&t.reverse())},t.prototype.InsertSortableToggles=function(){var t=this;this.container.find(".thead ul").first().find(".inner").each(function(e,i){""!=$(i).text()&&($(i).append('<i class="fa fa-sort"></i>'),$(i).css("cursor","pointer"),$(i).click(t.OnSort.bind(t,i)))})},t.prototype.OnSort=function(t){var e,i=$(t).find("i");i.hasClass("fa-sort")?(e="asc",i.removeClass("fa-sort"),i.addClass("fa-sort-asc")):i.hasClass("fa-sort-asc")?(e="desc",i.removeClass("fa-sort-asc"),i.addClass("fa-sort-desc")):i.hasClass("fa-sort-desc")&&(e="as-loaded",i.removeClass("fa-sort-desc"),i.addClass("fa-sort"));var r=this.container.find(".thead i").not(i);if(r.removeClass("fa-sort-asc"),r.removeClass("fa-sort-desc"),r.addClass("fa-sort"),null!=this.serverCb)return void this.serverCb(this.table.GetReader().GetHeading($(t)),e);switch(e){case"asc":this.table.Redraw(this.SortTable(t),null,!0);break;case"desc":this.table.Redraw(this.SortTable(t,!0),null,!0);break;default:this.table.Redraw(this.table.GetReader().GetSerialized(),null,!0)}},t.prototype.SortTable=function(t,e){void 0===e&&(e=!1);var i=this.table.GetReader().GetHeading($(t)),r=this.table.GetReader().GetSerialized().slice(0);return r.sort(this.sortByKey(i,this.selectSorter(i))),e&&r.reverse(),r},t.prototype.selectSorter=function(t){if(this.customSorters.hasOwnProperty(t))return this.customSorters[t];if(this.customSorters.hasOwnProperty("*"))return this.customSorters["*"];throw new Error("No default sorter set!")},t.prototype.sortByKey=function(t,e){return function(i,r){return e(i[t],r[t])}},t.prototype.naturalSort=function(t,e){var i,r,n=/(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,a=/^\s+|\s+$/g,s=/\s+/g,o=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,h=/^0x[0-9a-f]+$/i,l=/^0/,d=function(t){return(this.caseInsensitive&&(""+t).toLowerCase()||""+t).replace(a,"")},u=d(t)||"",c=d(e)||"",f=u.replace(n,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),p=c.replace(n,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),b=parseInt(null==u.match(h)?null:u.match(h).toString(),16)||1!==f.length&&Date.parse(u),y=parseInt(null==c.match(h)?null:c.match(h).toString(),16)||b&&c.match(o)&&Date.parse(c)||null,v=function(t,e){return(!t.match(l)||1==e)&&parseFloat(t)||t.replace(s," ").replace(a,"")||0};if(y){if(y>b)return-1;if(b>y)return 1}for(var w=0,S=f.length,g=p.length,x=Math.max(S,g);x>w;w++){if(i=v(f[w],S),r=v(p[w],g),isNaN(i)!==isNaN(r))return isNaN(i)?1:-1;if(typeof i!=typeof r&&(i+="",r+=""),r>i)return-1;if(i>r)return 1}return 0},t}();t.Sorter=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function e(e){return this.container=$(e),this.container.data("sexy-table",this),"undefined"!=typeof Transparency&&1==this.container.find(".tbody[data-bind]").length?void this.MakeWriteable():(this.InsertCellWrapper(),this.reader=new t.Reader(this),this.container.hasClass("sortable")&&this.MakeSortable(),this.container.hasClass("filterable")&&this.MakeFilterable(),this.sizer=new t.Sizer(this),this.container.hasClass("editable")&&this.MakeEditable(),void("undefined"!=typeof lunr&&this.MakeSearchable()))}return e.prototype.GetContainer=function(){return this.container},e.prototype.GetReader=function(){if(null==this.reader)throw new Error("Table Reader not yet created!");return this.reader},e.prototype.HasReader=function(){return null!=this.reader},e.prototype.GetWriter=function(){if(null==this.writer)throw new Error("Table is not Writeable! Use MakeWriteable.");return this.writer},e.prototype.HasWriter=function(){return null!=this.writer},e.prototype.GetSizer=function(){if(null==this.sizer)throw new Error("Table Sizer not yet created!");return this.sizer},e.prototype.HasSizer=function(){return null!=this.sizer},e.prototype.GetSorter=function(){if(null==this.sorter)throw new Error("Table is not Sortable! Use MakeSortable.");return this.sorter},e.prototype.HasSorter=function(){return null!=this.sorter},e.prototype.GetSearcher=function(){if(null==this.searcher)throw new Error("Table is not Searchable! Use MakeSearchable.");return this.searcher},e.prototype.HasSearcher=function(){return null!=this.searcher},e.prototype.GetFilterer=function(){if(null==this.filterer)throw new Error("Table is not Filterable! Use MakeFilterable.");return this.filterer},e.prototype.HasFilterer=function(){return null!=this.filterer},e.prototype.GetPager=function(){if(null==this.pager)throw new Error("Table is not Pageable! Use MakePageable.");return this.pager},e.prototype.HasPager=function(){return null!=this.pager},e.prototype.GetEditor=function(){if(null==this.editor)throw new Error("Table is not Editable! Use MakeEditable.");return this.editor},e.prototype.HasEditor=function(){return null!=this.editor},e.prototype.MakeEditable=function(){if(null==this.editor){if("undefined"==typeof Mousetrap)throw new Error("Editable tables require mousetrap.js see: https://craig.is/killing/mice");return this.editor=new t.Editor(this),this.editor}},e.prototype.MakePageable=function(e){return null==this.pager?(this.MakeWriteable(),this.pager=new t.Pager(this,e),this.pager):void 0},e.prototype.MakeWriteable=function(){if(null==this.writer){if("undefined"==typeof Transparency)throw new Error("Writeable tables require transparency.js see: http://leonidas.github.io/transparency/");if(0==this.container.find(".tbody[data-bind]").length)throw new Error("Writeable tables require a tbody container that contains a transparency template.");return this.writer=new t.Writer(this),this.writer}},e.prototype.InsertCellWrapper=function(){this.container.find("li").each(function(t,e){0==$(e).find(".inner").length&&0==$(e).parents(".data-bind-template").length&&$(e).wrapInner('<div class="inner"></div>')})},e.prototype.MakeSortable=function(){return null==this.sorter?(this.container.hasClass("sortable")||this.container.addClass("sortable"),this.sorter=new t.Sorter(this),this.sorter):void 0},e.prototype.MakeSearchable=function(){if(null==this.searcher){if("undefined"==typeof lunr)throw new Error("Searchable tables require Lunr! Get it from http://lunrjs.com/");return this.searcher=new t.Searcher(this),this.searcher}},e.prototype.MakeFilterable=function(){return null==this.filterer?(this.MakeSearchable(),this.container.hasClass("filterable")||this.container.addClass("filterable"),this.filterer=new t.Filterer(this),this.filterer):void 0},e.prototype.Redraw=function(t,e,i){if(void 0===e&&(e=!1),void 0===i&&(i=!1),0==this.container.find(".tbody").length)throw new Error("Redrawing requires a .tbody container!");if("undefined"==typeof t[0]||"function"==typeof t[0])return void this.container.find(".tbody").empty();var r=new Array;if("undefined"!=typeof t[0]._dom)for(var n in t)r.push(t[n]._dom);else r=t;this.container.find(".tbody").empty().append(r),i||(this.InsertCellWrapper(),this.sizer.ForceResize()),e&&this.reader.Serialize(),this.HasEditor()&&this.editor.ReAttachEventHandlers()},e.prototype.Reset=function(){this.Redraw(this.reader.GetOriginal(),!0,!0);try{this.GetSorter().ResetSortIcons()}catch(t){}try{this.GetFilterer().ResetFilters()}catch(t){}},e.prototype.Refresh=function(){this.InsertCellWrapper();try{this.GetReader().Serialize(!0)}catch(e){this.reader=new t.Reader(this)}null==this.sorter&&this.container.hasClass("sortable")&&this.MakeSortable(),null==this.filterer&&this.container.hasClass("filterable")&&this.MakeFilterable();try{this.GetSizer().ForceResize()}catch(e){this.sizer=new t.Sizer(this)}try{this.GetEditor().InsertEditFields()}catch(e){this.container.hasClass("editable")&&this.MakeEditable()}try{this.GetSearcher().BuildIndexes()}catch(e){"undefined"!=typeof lunr&&this.MakeSearchable()}},e.prototype.GetRows=function(){return this.container.find("ul").not(this.container.find(".data-bind-template ul"))},e.prototype.GetCells=function(){return this.container.find("li").not(this.container.find(".data-bind-template li"))},e.prototype.GetColumns=function(){var t=[];return this.GetRows().each(function(e,i){$(i).find("li").each(function(e,i){"undefined"==typeof t[e]&&t.push([]),t[e].push(i)})}),t},e}();t.Table=e}(SexyTable||(SexyTable={}));var SexyTable;!function(t){var e=function(){function t(t){this.table=t,this.container=this.table.GetContainer(),this.CreateDataBindTemplate()}return t.prototype.GetDirectives=function(){return this.directives},t.prototype.SetDirectives=function(t){this.directives=t},t.prototype.Append=function(t,e){var i=this.container.find(".data-bind-template");i.render(t,null==e?this.directives:e);var r=i.children("div").children().clone();i.find("*[id]").removeAttr("id"),this.container.find(".tbody").append(r),this.container.find(".tbody *[data-bind]").removeAttr("data-bind"),this.table.Refresh()},t.prototype.Replace=function(t,e){this.container.find(".tbody").empty(),this.Append(t,e)},t.prototype.CreateDataBindTemplate=function(){var t=$("<div></div>");t=t.addClass("data-bind-template").hide(),t.append(this.container.find(".tbody").clone().removeAttr("class")),this.container.append(t),this.container.find(".tbody").empty().removeAttr("data-bind")},t}();t.Writer=e}(SexyTable||(SexyTable={}));