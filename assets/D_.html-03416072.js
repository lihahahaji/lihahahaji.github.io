import{_ as u,r as c,o as E,c as _,a as e,b as l,d as s,w as a,e as p}from"./app-d1c0f0b2.js";const y="/assets/image-20231116125737913-b030be24.png",g="/assets/image-20231116130432537-0111074-cfb33bc4.png",F="/assets/image-20231117131553414-6c08f76d.png",D="/assets/image-20231118095205959-737aaf11.png",f="/assets/image-20231118100024467-446cb2c3.png",x="/assets/image-20231118103316220-6d171521.png",C={},b=p('<h1 id="d" tabindex="-1"><a class="header-anchor" href="#d" aria-hidden="true">#</a> D*</h1><h2 id="算法特点" tabindex="-1"><a class="header-anchor" href="#算法特点" aria-hidden="true">#</a> 算法特点</h2><p>动态路径规划（Dynamic A*），适用于动态环境中的路径规划</p><p>A*、Dijkstra 等则适用于静态环境中的路径规划</p><p>D* 算法是一种增量路径搜索算法，它允许在搜索过程中不断适应环境的变化。它可以在遇到新障碍物或环境变化时，重新计算最短路径而无需从头开始搜索。</p><p>因为D*算法有上述的特性，所以D*算法可以使用在“无先验地图信息/先验地图信息不多的环境中的导航”的问题，因为只需要在最开始假装整个地图没有任何障碍，起点到终点的路径就是一条直线，然后再在在线运行时不断使用D*算法重新规划即可。</p><ul><li><p>Compare to A*</p><p>A* 算法是从起点向目标点进行搜索，而 D* 算法在预搜索阶段会先从目标点向起点进行搜索。</p></li></ul><h3 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景" aria-hidden="true">#</a> 适用场景</h3><p>适用于需要实时路径规划的场景，如自动驾驶、机器人导航等。它可以在动态环境中动态地调整路径以避免障碍物。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',10),v={href:"https://en.wikipedia.org/wiki/D*",target:"_blank",rel:"noopener noreferrer"},X={href:"https://www.youtube.com/watch?v=e_7bSKXHvOI",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://blog.csdn.net/rezrezre/article/details/131008284",target:"_blank",rel:"noopener noreferrer"},k=p('<h2 id="重要定义" tabindex="-1"><a class="header-anchor" href="#重要定义" aria-hidden="true">#</a> 重要定义</h2><ul><li>OpenList</li></ul><p>​ 维护一个需要进行评估的节点列表</p><ul><li><p>G</p><p>表示路径搜索的目标点</p></li><li><p>C(x,y)</p><p>表示从节点 x 移动到节点 y 的代价</p></li><li><p>t(x) 节点的状态 state</p><ul><li>new</li><li>open</li><li>closed</li><li>raise - 成本高于上次出现在 openlist 中</li><li>lower - 成本低于上次出现在 openlist 中</li></ul></li><li><p>h(x)</p><p>表示地图上的点x到达目标点G的代价</p></li><li><p>k(x)</p><p>节点 x 最小的 h(x) 值</p></li><li><p>b(x)</p><p>用于记录当前节点x的父节点</p></li><li><p>主要函数</p><ul><li><p>Process-State()</p><blockquote><p>计算到目标G的最优路径</p></blockquote></li><li><p>Modify-Cost(x,y,val)</p><blockquote><p>用于改变两个节点（state）之间的开销<em>C（X,Y）</em> 并将受影响的节点（state）置于Openlist中</p></blockquote></li><li><p>insert(x,val)</p><blockquote><p>修改节点x的状态以及h(x)值和k(x)值</p></blockquote></li></ul></li></ul><h2 id="算法过程" tabindex="-1"><a class="header-anchor" href="#算法过程" aria-hidden="true">#</a> 算法过程</h2><ol><li><p>初始化</p><p>使用 dijkstra算法 从终点开始反向搜索初始地图，得到从地图上所有点到终点的最短距离 h。</p><blockquote><p>[为什么初始化搜索阶段不使用搜索效率更高的 A* ?](###1 初始化搜索阶段为什么不使用 A*?)</p></blockquote></li><li><p>重规划</p><p>第一步的初始化搜索完成之后，我们可以得到一条从起点到终点的最短路径。此时，机器人就会沿着这一条路径移动，当移动到路径上的某一个点，发现存在障碍物时（初始地图发生变化），就会触发<strong>重规划</strong>操作。</p><h3 id="process-state" tabindex="-1"><a class="header-anchor" href="#process-state" aria-hidden="true">#</a> Process State</h3><ol><li><p>在 <code>openlist</code> 中找到 <code>K</code> 值最小的节点 <code>X</code></p></li><li><p>判断 节点 <code>X</code> 的 <code>K</code> 和 <code>H</code> 是否相等</p><ol><li><p>若 <code>K &lt; H</code> 则表示 <code>X</code> 受到新增障碍物的影响，处于 <code>raise</code> 状态</p><p>遍历 <code>X</code> 的邻接节点，看是否可以通过将某个邻接节点作为 <code>X</code> 的父结点来是 <code>X.H</code> 减小</p></li></ol></li><li><p>若 <code>K = H</code> 则表示 <code>X</code> 没有受到新增障碍物的影响(或者已经被上一步操作修复，回到了最佳状态)，处于 <code>lower</code> 状态</p><p>遍历 <code>X</code> 的邻接节点，看看是否有邻接节点 <code>Y</code> 需要以 <code>X</code> 作为父结点</p><ol><li><p>如果 <code>Y.state = new</code> , 即 <code>Y</code> 还没有访问过</p><p>或者 <code>Y.b = X &amp;&amp; Y.h != X.h+C(X,Y)</code></p><p>或者 <code>Y.b != X &amp;&amp; Y.h &gt; X.h+C(X,Y)</code> 则:</p><pre><code>1. 将 `X` 作为 `Y` 的父结点;\n2. 更新 `Y.h = X.h+C(X,Y) `\n3. 将 `Y` 加入开放列表\n</code></pre></li></ol></li><li><p>若 <code>K &lt; H</code> 表示仍然处于 <code>raise</code> 状态，需要进一步优化</p><p>遍历 X 的邻接节点 Y</p><ol><li><p>如果 <code>Y.state = new </code></p><p>或者 <code>Y.b = X &amp;&amp; Y.h != X.h+C(X,Y)</code> 则：</p><pre><code>1. 将 `X` 作为 `Y` 的父结点;\n2. 更新 `Y.h = X.h+C(X,Y) `\n3. 将 `Y` 加入开放列表\n</code></pre></li><li><p>如果<code>Y.b != X &amp;&amp; Y.h &gt; X.h+C(X,Y)</code> 表示Y 可以通过将父结点改为 <code>X</code> 使得 <code>Y.h</code>的值更小，但是由于 X 自身仍然处于 <code>raise</code> 状态，所以要先将 <code>X</code> 再次追加到 Openlist，待下一次循环中 X 回归lower 状态之后再处理。</p></li><li><p>如果<code>Y.b != X &amp;&amp; X.h &gt; Y.h+C(X,Y) &amp;&amp;Y.state = closed &amp;&amp; Y.h &gt; K</code> 表示 <code>X</code> 不是 <code>Y</code> 的父结点，而如果让 <code>Y</code> 成为 <code>X</code> 的父结点可以使得 <code>X.h</code> 更小, 而 <code>Y</code> 已经从 <code>openlist</code> 中移出。然而当前从 <code>openlist</code> 中取出的节点 <code>K</code> 值比 <code>Y.h</code> 还要小，这就表示已经移出的 <code>Y</code> 节点受到了障碍物的影响导致 <code>H</code> 值升高，所以要将 <code>Y</code> 重新加入 <code>openlist</code> 来处理。</p><p>​</p></li></ol></li></ol></li></ol><hr><h2 id="论文原文中关于-算法的描述-2-2-algorithm-description" tabindex="-1"><a class="header-anchor" href="#论文原文中关于-算法的描述-2-2-algorithm-description" aria-hidden="true">#</a> 论文原文中关于 算法的描述 [ 2.2 Algorithm Description]</h2>',8),w={class:"katex"},A={class:"katex-mathml"},M=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mord mathnormal">rocess</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">St</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">e</span></span></span>',1),L={class:"katex"},O={class:"katex-mathml"},q=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mord mathnormal">o</span><span class="mord mathnormal">d</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mord mathnormal">os</span><span class="mord mathnormal">t</span></span></span>',1),N=e("ul",null,[e("li",null,[e("p",null,"Process-State()"),e("blockquote",null,[e("p",null,"计算到目标G的最优路径")])]),e("li",null,[e("p",null,"Modify-Cost(x,y,val)"),e("blockquote",null,[e("p",null,[l("用于改变两个节点（state）之间的开销"),e("em",null,"C（X,Y）"),l(" 并将受影响的节点（state）置于Openlist中")])])])],-1),K=e("p",null,"算法流程：",-1),S=e("li",null,[e("p",null,"首先将所有的节点的 state 值设置为 new，把终点 G 的 H 值设置为 0，然后把终点 G 加入 OpenList。")],-1),H=e("li",null,[e("p",null,"重复调用 Process-state 函数， 直到机器人当前所处的位置 robot’s state（初始状态下就是起点）X 从Openlist 中移出，表示成功找到了一条从终点到起点的路径，或者程序返回-1表示没有找到路径。")],-1),I=e("li",null,[e("p",null,"然后机器人会利用父结点指针来遍历这条路经（沿着这条路径移动），直到他达到终点，或者说在半路遇到了新发现的障碍。")],-1),T=e("li",null,[e("p",null,"若机器人在半路上遇到了新发现的障碍，此时就会调用 Modify-Cost 函数来修正 C(Y,N) - 将当前节点到新发现障碍节点之间的路径权重修改为 INF，同时将受到新的障碍物影响的节点移动到 OpenList。")],-1),G={class:"katex"},z={class:"katex-mathml"},P=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="mord">.</span><span class="mord mathnormal">h</span></span></span>',1),R={class:"katex"},V={class:"katex-mathml"},B=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="mord">.</span><span class="mord mathnormal">h</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="mclose">)</span></span></span>',1),j=e("blockquote",null,[e("p",null,"这里的 O（Y）是什么意思没搞懂，应该是使得 Y.h 达到最佳状态的意思吧，这个 O 应该是 optimal")],-1),W=e("li",null,[e("p",null,"此时，一条新的路径已经被构造出来，机器人将会沿着新的路径继续行走。")],-1),J=e("p",null,"process state 中几个函数的解释：",-1),Q={class:"katex"},U={class:"katex-mathml"},Z=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">GET</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span></span></span>',1),$=p(`<ul><li><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="shiki nord" style="background-color:#2e3440ff;" tabindex="0"><code><span class="line"><span style="color:#88C0D0;">get_min</span><span style="color:#ECEFF4;">()</span></span>
<span class="line"><span style="color:#ECEFF4;">{</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#81A1C1;">return</span><span style="color:#D8DEE9FF;"> x from openlist which </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">k</span><span style="color:#D8DEE9FF;"> is smallest</span></span>
<span class="line"><span style="color:#ECEFF4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li></li></ul>`,1),ss={class:"katex"},as={class:"katex-mathml"},ls=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mord mathnormal">L</span><span class="mord mathnormal" style="margin-right:0.05764em;">ETE</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mclose">)</span></span></span>',1),ns=p(`<ul><li><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="shiki nord" style="background-color:#2e3440ff;" tabindex="0"><code><span class="line"><span style="color:#81A1C1;">delete</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9FF;">x</span><span style="color:#ECEFF4;">)</span></span>
<span class="line"><span style="color:#ECEFF4;">{</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#D8DEE9;">openlist</span><span style="color:#ECEFF4;">.</span><span style="color:#88C0D0;">erase</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9FF;">x</span><span style="color:#ECEFF4;">)</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">t</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> closed</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#ECEFF4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li></li></ul>`,1),es={class:"katex"},ts={class:"katex-mathml"},ps=p('<span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.13889em;">NSERT</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">h</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight" style="margin-right:0.02691em;">w</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span>',1),os=p(`<ul><li><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="shiki nord" style="background-color:#2e3440ff;" tabindex="0"><code><span class="line"><span style="color:#88C0D0;">insert</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9FF;">x</span><span style="color:#ECEFF4;">,</span><span style="color:#D8DEE9FF;">h_new</span><span style="color:#ECEFF4;">)</span></span>
<span class="line"><span style="color:#ECEFF4;">{</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#81A1C1;">if</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">t</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">==</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">new</span><span style="color:#ECEFF4;">)</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">k</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> h_new</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#81A1C1;">else</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">if</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">t</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">==</span><span style="color:#D8DEE9FF;"> open</span><span style="color:#ECEFF4;">)</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">k</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#88C0D0;">min</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">k</span><span style="color:#ECEFF4;">,</span><span style="color:#D8DEE9FF;">h_new</span><span style="color:#ECEFF4;">)</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#81A1C1;">else</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">if</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">t</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">==</span><span style="color:#D8DEE9FF;"> closed</span><span style="color:#ECEFF4;">)</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">k</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#88C0D0;">min</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">h</span><span style="color:#ECEFF4;">,</span><span style="color:#D8DEE9FF;">h_new</span><span style="color:#ECEFF4;">)</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">h</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> h_new</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#D8DEE9;">x</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">t</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> open</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#D8DEE9FF;">  </span><span style="color:#D8DEE9;">openlist</span><span style="color:#ECEFF4;">.</span><span style="color:#88C0D0;">insert</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9FF;">x</span><span style="color:#ECEFF4;">)</span><span style="color:#81A1C1;">;</span></span>
<span class="line"><span style="color:#ECEFF4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,1),cs=p('<p>接着解释了 process-state 函数的具体实现：</p><ol><li><p><img src="'+y+'" alt="image-20231116125737913"></p><p>L1 - L3 ： 将 openlist 中 K 值最小的节点 X 取出。</p></li><li><p><img src="'+g+'" alt="image-20231116130432537"></p><p>L8 - L13 ：判断 X 的 K 和 H 值，如果说 X 处于 lower 状态，也就是说 X.h = X.k，那么这个 X 节点到终点的路径成本是最优的。</p><p>然后检查 X 的每一个邻居节点 Y，看看这些邻居节点的路径成本能否降低。</p><p>具体来说：</p><p>​ 如果 Y 节点是一个没有被访问过的节点，那么 Y 的 父结点会变成 X，而且调用 Insert 函数更新 Y 的 H 值并且将其加入开放列表。</p><p>​ 如果 Y 节点的父结点是 X，那么X 的路径成本会传播到 Y，而不管新的成本是否大于或小于旧的成本。</p><p>​ 如果 Y 节点的父结点原来不是 X，但是如果把 X 作为父结点，可以获得更低的路径成本，那么就把父结点更新为 X。</p></li><li><p><img src="'+F+'" alt="image-20231117131553414"></p></li></ol><p>​ L4 - L7 : 如果一个节点处于 raise 状态的话，那么他当前到终点的路径节点可能不是最优的，在将路径成本变化传播到邻居节点 之前，先遍历其成本最佳的邻居，看看是否可以减少 X.h。</p><ol start="4"><li><img src="'+D+'" alt="image-20231118095205959"></li></ol><p>​ L15 - L18: 路径成本成本更改以与 LOWER 节点相同的方式（2）传播到 NEW 节点和直接后代。</p><ol start="5"><li><p><img src="'+f+'" alt="image-20231118100024467"></p><p>L20 - L21：如果X能够降低非子孙的节点的路径成本，则 X 被重新加入Openlist，以便未来的扩展。（因为此时 X 节点仍然处于 Raise 状态，没有达到最佳状态）</p></li><li><p><img src="'+x+'" alt="image-20231118103316220"></p><p>L23 - L25：如果X的路径成本能够被一个 次优 邻居降低 ， 则将这个 次优 的邻居加入开放列表，更新被 &quot;推迟&quot;，直到这个邻居有一个最优的路径成本。</p></li><li><p>最后函数会返回 当前开放列表中最小的 K 值。</p></li></ol><p>​</p><h2 id="hint" tabindex="-1"><a class="header-anchor" href="#hint" aria-hidden="true">#</a> Hint</h2><h3 id="_1-初始化搜索阶段为什么不使用-a" tabindex="-1"><a class="header-anchor" href="#_1-初始化搜索阶段为什么不使用-a" aria-hidden="true">#</a> 1 初始化搜索阶段为什么不使用 A*?</h3><p>这是D*的一个核心问题。其实也可以在第一次搜索中加入启发函数，让第一次快一点，但是D*的核心是保证在全过程中，出现新发现的障碍物时也能很快地找到解，所以第一次搜索的范围其实尽可能的大会好一点。 如果在第一次搜索加入启发函数，确实第一次搜索会快很多，因为搜索范围小了。但是在后面发现新障碍物的时候，因为第一次的搜索范围比较小，很可能这个新障碍物导致的重新搜索，需要重新搜索一些第一次没搜索到的空间，因此这些点依然会被加入到搜索队列中。 一言概之就是说，启发式搜索减少的第一次搜索的点，终归会在后面的搜索中加入到搜索队列中，出来混迟早是要还的，所以实际上并不能很好地提高效率。 这样做可能让整体来说的效率变高，但是方法是减少第一次的搜索范围，而增加后续的搜索范围，而D*因为更多强调实时性，而第一次搜索是可以离线运行，但后续的搜索一定是在线运行的，增加后续的搜索范围会使实时性降低，这反而是不能接受的，因此尽管整体（也即第一次+后续搜索）的效率提升，但后续搜索的效率降低，得不偿失。</p>',10);function is(rs,ds){const m=c("ExternalLinkIcon"),n=c("mi"),t=c("mo"),o=c("mrow"),i=c("annotation"),r=c("semantics"),d=c("math"),h=c("msub");return E(),_("div",null,[b,e("ul",null,[e("li",null,[e("a",v,[l("wikipedia"),s(m)])]),e("li",null,[e("a",X,[l("算法动态演示"),s(m)])]),e("li",null,[e("a",Y,[l("博客-D*算法超详解"),s(m)])])]),k,e("p",null,[l("首先说明了 D* 算法主要包含两个函数 ："),e("span",w,[e("span",A,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("P")]),_:1}),s(n,null,{default:a(()=>[l("r")]),_:1}),s(n,null,{default:a(()=>[l("o")]),_:1}),s(n,null,{default:a(()=>[l("c")]),_:1}),s(n,null,{default:a(()=>[l("e")]),_:1}),s(n,null,{default:a(()=>[l("s")]),_:1}),s(n,null,{default:a(()=>[l("s")]),_:1}),s(t,null,{default:a(()=>[l("−")]),_:1}),s(n,null,{default:a(()=>[l("S")]),_:1}),s(n,null,{default:a(()=>[l("t")]),_:1}),s(n,null,{default:a(()=>[l("a")]),_:1}),s(n,null,{default:a(()=>[l("t")]),_:1}),s(n,null,{default:a(()=>[l("e")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("Process-State")]),_:1})]),_:1})]),_:1})]),M]),l(" 和 "),e("span",L,[e("span",O,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("M")]),_:1}),s(n,null,{default:a(()=>[l("o")]),_:1}),s(n,null,{default:a(()=>[l("d")]),_:1}),s(n,null,{default:a(()=>[l("i")]),_:1}),s(n,null,{default:a(()=>[l("f")]),_:1}),s(n,null,{default:a(()=>[l("y")]),_:1}),s(t,null,{default:a(()=>[l("−")]),_:1}),s(n,null,{default:a(()=>[l("C")]),_:1}),s(n,null,{default:a(()=>[l("o")]),_:1}),s(n,null,{default:a(()=>[l("s")]),_:1}),s(n,null,{default:a(()=>[l("t")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("Modify-Cost")]),_:1})]),_:1})]),_:1})]),q]),l(".")]),N,K,e("ol",null,[S,H,I,T,e("li",null,[e("p",null,[l("我们假设机器人在发现新的障碍物时所处的节点是 Y ，接下来重复调用 Process-State 直到 函数返回的 "),e("span",G,[e("span",z,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(h,null,{default:a(()=>[s(n,null,{default:a(()=>[l("k")]),_:1}),s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("m")]),_:1}),s(n,null,{default:a(()=>[l("i")]),_:1}),s(n,null,{default:a(()=>[l("n")]),_:1})]),_:1})]),_:1}),s(t,null,{default:a(()=>[l(">")]),_:1}),s(t,null,{default:a(()=>[l("=")]),_:1}),s(n,null,{default:a(()=>[l("Y")]),_:1}),s(n,{mathvariant:"normal"},{default:a(()=>[l(".")]),_:1}),s(n,null,{default:a(()=>[l("h")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("k_{min} >= Y.h")]),_:1})]),_:1})]),_:1})]),P]),l(" ,即当前开放列表中最小的 K 值也比 Y.h 要大或者相等，新障碍物造成的路径成本变化传播到 Y ，使得 "),e("span",R,[e("span",V,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("Y")]),_:1}),s(n,{mathvariant:"normal"},{default:a(()=>[l(".")]),_:1}),s(n,null,{default:a(()=>[l("h")]),_:1}),s(t,null,{default:a(()=>[l("=")]),_:1}),s(n,null,{default:a(()=>[l("O")]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l("(")]),_:1}),s(n,null,{default:a(()=>[l("Y")]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l(")")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("Y.h = O(Y)")]),_:1})]),_:1})]),_:1})]),B]),l(" 。")]),j]),W]),J,e("ul",null,[e("li",null,[e("p",null,[e("span",Q,[e("span",U,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("G")]),_:1}),s(n,null,{default:a(()=>[l("E")]),_:1}),s(n,null,{default:a(()=>[l("T")]),_:1}),s(t,null,{default:a(()=>[l("−")]),_:1}),s(n,null,{default:a(()=>[l("M")]),_:1}),s(n,null,{default:a(()=>[l("I")]),_:1}),s(n,null,{default:a(()=>[l("N")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("GET-MIN")]),_:1})]),_:1})]),_:1})]),Z])]),$]),e("li",null,[e("p",null,[e("span",ss,[e("span",as,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("D")]),_:1}),s(n,null,{default:a(()=>[l("E")]),_:1}),s(n,null,{default:a(()=>[l("L")]),_:1}),s(n,null,{default:a(()=>[l("E")]),_:1}),s(n,null,{default:a(()=>[l("T")]),_:1}),s(n,null,{default:a(()=>[l("E")]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l("(")]),_:1}),s(n,null,{default:a(()=>[l("X")]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l(")")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("DELETE(X)")]),_:1})]),_:1})]),_:1})]),ls])]),ns]),e("li",null,[e("p",null,[e("span",es,[e("span",ts,[s(d,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:a(()=>[s(r,null,{default:a(()=>[s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("I")]),_:1}),s(n,null,{default:a(()=>[l("N")]),_:1}),s(n,null,{default:a(()=>[l("S")]),_:1}),s(n,null,{default:a(()=>[l("E")]),_:1}),s(n,null,{default:a(()=>[l("R")]),_:1}),s(n,null,{default:a(()=>[l("T")]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l("(")]),_:1}),s(n,null,{default:a(()=>[l("X")]),_:1}),s(t,{separator:"true"},{default:a(()=>[l(",")]),_:1}),s(h,null,{default:a(()=>[s(n,null,{default:a(()=>[l("h")]),_:1}),s(o,null,{default:a(()=>[s(n,null,{default:a(()=>[l("n")]),_:1}),s(n,null,{default:a(()=>[l("e")]),_:1}),s(n,null,{default:a(()=>[l("w")]),_:1})]),_:1})]),_:1}),s(t,{stretchy:"false"},{default:a(()=>[l(")")]),_:1})]),_:1}),s(i,{encoding:"application/x-tex"},{default:a(()=>[l("INSERT(X,h_{new})")]),_:1})]),_:1})]),_:1})]),ps])]),os])]),cs])}const hs=u(C,[["render",is],["__file","D_.html.vue"]]);export{hs as default};
