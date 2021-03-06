URL="https://raw.githubusercontent.com/googleapis/googleapis/master/"

regenerate:
	go install ./protoc-gen-gogogoogleapis

	protoc \
	--gogogoogleapis_out=\
	Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,\
	:. \
	-I=. \
	google/rpc/status.proto \
	google/rpc/error_details.proto \
	google/rpc/code.proto \

	protoc \
	--gogogoogleapis_out=\
	Mgoogle/protobuf/descriptor.proto=github.com/gogo/protobuf/protoc-gen-gogo/descriptor,\
	:. \
	-I=. \
	google/api/http.proto \
	google/api/annotations.proto

	protoc \
	--gogogoogleapis_out=\
	Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/descriptor.proto=github.com/gogo/protobuf/protoc-gen-gogo/descriptor,\
	:. \
	-I=. \
	google/api/expr/v1alpha1/syntax.proto \
	google/api/expr/v1alpha1/value.proto

	protoc \
	--gogogoogleapis_out=\
	Mgoogle/protobuf/descriptor.proto=github.com/gogo/protobuf/protoc-gen-gogo/descriptor,\
	:. \
	-I=. \
	google/type/calendar_period.proto \
	google/type/color.proto \
	google/type/date.proto \
	google/type/dayofweek.proto \
	google/type/expr.proto \
	google/type/fraction.proto \
	google/type/latlng.proto \
	google/type/money.proto \
	google/type/month.proto \
	google/type/postal_address.proto \
	google/type/quaternion.proto \
	google/type/timeofday.proto

	protoc \
	--gogogoogleapis_out=\
	Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
	Mgoogle/protobuf/descriptor.proto=github.com/gogo/protobuf/protoc-gen-gogo/descriptor,\
	:. \
	-I=. \
	google/type/datetime.proto

update:
	go get github.com/gogo/protobuf/gogoreplace

	(cd ./google/rpc && rm status.proto; wget ${URL}/google/rpc/status.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/rpc/status;status";' \
		'option go_package = "rpc";' \
		./google/rpc/status.proto

	(cd ./google/rpc && rm error_details.proto; wget ${URL}/google/rpc/error_details.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/rpc/errdetails;errdetails";' \
		'option go_package = "rpc";' \
		./google/rpc/error_details.proto

	(cd ./google/rpc && rm code.proto; wget ${URL}/google/rpc/code.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/rpc/code;code";' \
		'option go_package = "rpc";' \
		./google/rpc/code.proto

	(cd ./google/api && rm http.proto; wget ${URL}/google/api/http.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/api/annotations;annotations";' \
		'option go_package = "api";' \
		./google/api/http.proto

	(cd ./google/api && rm annotations.proto; wget ${URL}/google/api/annotations.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/api/annotations;annotations";' \
		'option go_package = "api";' \
		./google/api/annotations.proto

	(cd ./google/api/expr/v1alpha1 && rm syntax.proto; wget ${URL}/google/api/expr/v1alpha1/syntax.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/api/expr/v1alpha1;expr";' \
		'option go_package = "expr";' \
		./google/api/expr/v1alpha1/syntax.proto

	(cd ./google/api/expr/v1alpha1 && rm value.proto; wget ${URL}/google/api/expr/v1alpha1/value.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/api/expr/v1alpha1;expr";' \
		'option go_package = "expr";' \
		./google/api/expr/v1alpha1/value.proto

	(cd ./google/type && rm calendar_period.proto; wget ${URL}/google/type/calendar_period.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/calendarperiod;calendarperiod";' \
		'option go_package = "type";' \
		./google/type/calendar_period.proto

	(cd ./google/type && rm color.proto; wget ${URL}/google/type/color.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/color;color";' \
		'option go_package = "type";' \
		./google/type/color.proto

	(cd ./google/type && rm date.proto; wget ${URL}/google/type/date.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/date;date";' \
		'option go_package = "type";' \
		./google/type/date.proto

	(cd ./google/type && rm datetime.proto; wget ${URL}/google/type/datetime.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/datetime;datetime";' \
		'option go_package = "type";' \
		./google/type/datetime.proto

	(cd ./google/type && rm dayofweek.proto; wget ${URL}/google/type/dayofweek.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/dayofweek;dayofweek";' \
		'option go_package = "type";' \
		./google/type/dayofweek.proto

	(cd ./google/type && rm expr.proto; wget ${URL}/google/type/expr.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/expr;expr";' \
		'option go_package = "type";' \
		./google/type/expr.proto

	(cd ./google/type && rm fraction.proto; wget ${URL}/google/type/fraction.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/fraction;fraction";' \
		'option go_package = "type";' \
		./google/type/fraction.proto

	(cd ./google/type && rm latlng.proto; wget ${URL}/google/type/latlng.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/latlng;latlng";' \
		'option go_package = "type";' \
		./google/type/latlng.proto

	(cd ./google/type && rm money.proto; wget ${URL}/google/type/money.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/money;money";' \
		'option go_package = "type";' \
		./google/type/money.proto

	(cd ./google/type && rm month.proto; wget ${URL}/google/type/month.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/month;month";' \
		'option go_package = "type";' \
		./google/type/month.proto

	(cd ./google/type && rm postal_address.proto; wget ${URL}/google/type/postal_address.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/postaladdress;postaladdress";' \
		'option go_package = "type";' \
		./google/type/postal_address.proto

	(cd ./google/type && rm quaternion.proto; wget ${URL}/google/type/quaternion.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/quaternion;quaternion";' \
		'option go_package = "type";' \
		./google/type/quaternion.proto

	(cd ./google/type && rm timeofday.proto; wget ${URL}/google/type/timeofday.proto)
	gogoreplace \
		'option go_package = "google.golang.org/genproto/googleapis/type/timeofday;timeofday";' \
		'option go_package = "type";' \
		./google/type/timeofday.proto
