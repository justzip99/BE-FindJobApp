import { Application } from "../entities/application.entity";

export function transformApplications(
  applications: Application[],
): Record<string, any> {
  const applicationJson: Record<string, any> = {};

  applications.forEach((application) => {
    applicationJson[`applicationId:${application.id}`] = {
      userId: application.userId,
      posts: application.applicationPosts.map((ap) => ({
        applicationId: ap.applicationId,
        postId: ap.postId,
        job_position: ap.post.job_position,
        requirements: ap.post.requirements,
        qualification: ap.post.qualification,
        experience: ap.post.experience,
        jobType: ap.post.jobType,
        specialization: ap.post.specialization,
        description: ap.post.description,
        salary: ap.post.salary,
        location: {
          lat: ap.post.location.lat,
          lng: ap.post.location.lng,
          address: ap.post.location.address,
          district: ap.post.location.district,
          province: ap.post.location.province,
        },
        datePost: ap.post.datePost,
        expDatePost: ap.post.expDatePost,
      })),
    };
  });

  return applicationJson;
}
