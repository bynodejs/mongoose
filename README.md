> mongoose

Index
-----

1. Docker
    -   리눅스의 응용 프로그램들을 소프트웨어 컨테이너 안에 배치시키는 일을 자동화하는 오픈 소스 프로젝트
        1. docker-compose up : 실행  /  docker-compose up -d : 백그라운드 실행

        2. docker-compose -f [docker-compose.yml(파일명)] up -d : 해당 파일 실행

        3. docker ps : 현재 구동 확인

        4. docker-compose down : 종료

2. NoSQL
    1. 장점
        - Flexibility : 스키마가 없는 구조라 어떤 형태의 데이터라도 저장할 수 있다.

        - Performance : Read & Write 성능이 뛰어나다. 캐싱이나 많은 트래픽을 감당할 때 써도 좋다.

        - Scalability : 스케일 아웃 구조를 채택해서 쉽게 운용 가능, Auto sharding 지원

        - Deep Query ability : Query Language를 사용하여 SQL 만큼 강력한 Query 성능을 제공한다.

        - Conversion / Mapping : JSON 형태로 저장이 가능하여 직관적이고 개발이 편리하다.

    2. 단점
        - 정합성이 떨어지므로 트랜잭션이 필요한 경우에는 부적합하다. (ex: 금융, 결제, 회원정보)

        - JOIN 기능이 없다. 그러므로 JOIN이 필요없도록 데이터 구조화 필요 

        - memory mapped file으로 파일 엔진 DB이다. 메모리 관리를 OS에게 위임한다. 즉, 메모리 크기가 성능을 좌우한다.

    3. 구조
        - document : { 'key' : value } 구로오 이루어져 있으며 value에는 또 다시 document가 들어갈수있다.

        - 또한 동적 스키마를 갖고 있어서, collection(테이블)안에 있는 document끼리 다른 스키마를 가질 수 있다.(스키마 프리)

        - primary key(objectId) : objectId는 12bytes 16진수 값으로 document의 유일성을 보장한다.
            순서대로 4bytes timestamp, 3bytes machine id, 2bytes 프로세스Id, 3bytes 순차번호 = index(auto_increment)

        - collection : document의 그룹이며, document들이 collection 내부에 위치하고 있다.

        - database : collection들의 물리적인 컨테이너이다. 각 database는 파일시스템에 여러파일들로 저장된다.

3. mongoose
    - ODM (Object Document Mapping) 

    - node_modules schema 생성한다.

    - schema를 object 구조로 만든게 model이라고 생각하면 된다.

4. Database Tools
    - <a href="https://robomongo.org/download">Robo 3T</a>

5. mongoDB Cloud
    - <a href="https://www.mongodb.com/cloud/atlas">mongoDB Atlas</a>

    - <a href="https://aws.amazon.com/ko/documentdb/">Amoazon DocumentDB</a>

Modules
-------

* <a href="https://github.com/visionmedia/debug#readme">debug</a>

* <a href="https://github.com/mde/ejs">ejs</a>

* <a href="http://expressjs.com/">express</a>

* <a href="https://mongoosejs.com/">mongoose</a>

* <a href="https://github.com/ramiel/mongoose-sequence#readme">mongoose-sequence</a>

* <a href="https://github.com/expressjs/morgan#readme">morgan</a>

Link
----

* <a href="https://ljlm0402.netlify.com/nodejs/mongoose.1/">mongoose 1탄, 몽고디비 설치 및 연동하기</a>

* <a href="https://ljlm0402.netlify.com/nodejs/mongoose.2/">mongoose 2탄, REST API 만들기</a>

* <a href="https://ljlm0402.netlify.com/nodejs/mongoose.3/">mongoose 3탄, 화면 구성하기</a>
